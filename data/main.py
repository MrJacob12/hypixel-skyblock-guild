import requests
import json
import time
import os
import shutil
import subprocess
from typing import Optional, Dict, Any, List, Callable, Union
from dataclasses import dataclass
from abc import ABC, abstractmethod
from dotenv import load_dotenv
from datetime import datetime
from concurrent.futures import ThreadPoolExecutor, as_completed

load_dotenv()

def shorten_number(num: Union[int, float]) -> str:
    suffixes = [
        (1_000_000_000_000, 'T'),
        (1_000_000_000, 'B'),
        (1_000_000, 'M'),
        (1_000, 'K'),
    ]    
    if abs(num) < 1000:
        return str(int(num))
        
    for threshold, suffix in suffixes:
        if abs(num) >= threshold:
            
            shortened_num = f"{num / threshold:.2f}"
            return f"{shortened_num}{suffix}"
    return str(int(num))

@dataclass
class Config:
    api_key: str = os.environ.get("API_KEY", "")
    guild_id: str = "6898ed238ea8c97d1328bb2b"
    request_limit: int = 60
    repo_path: str = "/fern/apps/hypixel/hypixel-skyblock-guild"
    game_mode: str = "ironman"
    max_workers: int = 5


class RateLimiter:
    def __init__(self, limit: int = 60, time_window: int = 60):
        self.limit = limit
        self.time_window = time_window
        self.requests = []
    
    def wait_if_needed(self) -> None:
        current_time = time.time()
        
        self.requests = [t for t in self.requests if current_time - t < self.time_window]
        
        if len(self.requests) >= self.limit:
            oldest_request = min(self.requests)
            wait_time = self.time_window - (current_time - oldest_request)
            if wait_time > 0:
                print(f"Rate limit reached. Waiting {wait_time:.2f}s...")
                time.sleep(wait_time)
                self.requests = []
        
        self.requests.append(current_time)


class APIClient:
    def __init__(self, api_key: str, rate_limiter: RateLimiter):
        self.api_key = api_key
        self.rate_limiter = rate_limiter
        self.session = requests.Session()
        self.session.headers.update({"API-Key": api_key})
    
    def get(self, url: str, params: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
        """Wykonuje GET request z rate limiting"""
        self.rate_limiter.wait_if_needed()
        
        try:
            response = self.session.get(url, params=params, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success', False):
                    return data
                else:
                    cause = data.get('cause', 'Unknown cause')
                    print(f"API error: {cause}")
                    return None
            else:
                print(f"HTTP error {response.status_code}")
                return None
                
        except Exception as e:
            print(f"Request failed: {e}")
            return None


class UsernameCache:
    def __init__(self):
        self.cache: Dict[str, str] = {}
    
    def get_username(self, uuid: str) -> str:
        if uuid in self.cache:
            return self.cache[uuid]
        
        try:
            response = requests.get(
                f"https://playerdb.co/api/player/minecraft/{uuid}",
                timeout=5
            )
            if response.status_code == 200:
                data = response.json()
                if data.get('success'):
                    username = data.get('data', {}).get('player', {}).get('username')
                    if username:
                        self.cache[uuid] = username
                        return username
        except Exception as e:
            print(f"Failed to fetch username for {uuid}: {e}")
        
        fallback = uuid[:8]
        self.cache[uuid] = fallback
        return fallback


@dataclass
class LeaderboardEntry:
    rank: int
    username: str
    uuid: str
    value: Any
    formatted_value: str


class LeaderboardProcessor(ABC):
    def __init__(self, username_cache: UsernameCache):
        self.username_cache = username_cache
    
    @abstractmethod
    def get_category_name(self) -> str:
        pass
    
    @abstractmethod
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[Any]:
        pass
    
    def format_value(self, value: Any) -> str:
        return str(value)
    
    def process(self, active_profiles: List[Dict]) -> Dict:
        members_data = []
        
        for item in active_profiles:
            uuid = item.get('uuid')
            profile_data = item.get('profile_data')
            members = item.get('members', {})
            
            if not profile_data or not members or uuid not in members:
                continue
            
            player_data = members[uuid]
            value = self.extract_value(player_data, profile_data)
            
            if value is None:
                continue
            
            username = self.username_cache.get_username(uuid)
            print(f"Processing {username} ({self.get_category_name()}: {value})")
            
            members_data.append({
                'uuid': uuid,
                'username': username,
                'value': value
            })
        
        members_data.sort(key=lambda x: x['value'], reverse=True)
        
        leaderboard_members = []
        for index, member in enumerate(members_data):
            leaderboard_members.append({
                'rank': index + 1,
                'username': member['username'],
                'uuid': member['uuid'],
                'value': member['value'],
                'formattedValue': shorten_number(member['value'])
            })
        
        return {
            'category': self.get_category_name(),
            'lastUpdated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            'members': leaderboard_members
        }


class SkyblockLevelProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Skyblock Level"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        leveling_exp = player_data.get('leveling', {}).get('experience')
        if isinstance(leveling_exp, (int, float)):
            return int(leveling_exp / 100)
        return None


class NucleusRunsProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Nucleus Runs"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        nucleus_runs = player_data.get('leveling', {}).get('completions', {}).get('NUCLEUS_RUNS')
        if isinstance(nucleus_runs, (int, float)):
            return int(nucleus_runs)
        return None


class SkillProcessor(LeaderboardProcessor):
    def __init__(self, username_cache: UsernameCache, skill_name: str):
        super().__init__(username_cache)
        self.skill_name = skill_name
    
    def get_category_name(self) -> str:
        return f"{self.skill_name.capitalize()} Skill"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[float]:
        experience = player_data.get('player_data', {}).get('experience', {}).get(f'SKILL_{self.skill_name.upper()}')
        if isinstance(experience, (int, float)):
            return experience
        return None


class CollectionProcessor(LeaderboardProcessor):
    def __init__(self, username_cache: UsernameCache, collection_name: str):
        super().__init__(username_cache)
        self.collection_name = collection_name
    
    def get_category_name(self) -> str:
        return f"{self.collection_name.capitalize()} Collection"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        collections = player_data.get('collection', {})
        collection_data = collections.get(self.collection_name, int)
        if isinstance(collection_data, (int, float)):
            return int(collection_data)
        return None

class AccessoryBagStorageProcessor(LeaderboardProcessor):
    def __init__(self, username_cache: UsernameCache):
        super().__init__(username_cache)

    def get_category_name(self) -> str:
        return "Magical Power"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        accessory_bag = player_data.get('accessory_bag_storage', {})
        magical_power = accessory_bag.get('highest_magical_power')
        if isinstance(magical_power, (int, float)):
            return int(magical_power)
        return None

class SlayerZombieProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Zombie"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_zombie = player_data.get('slayer', {}).get('slayer_bosses', {}).get('zombie', {}).get('xp')
        if isinstance(slayer_zombie, (int, float)):
            return int(slayer_zombie)
        return None

class SlayerSpiderProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Spider"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_spider = player_data.get('slayer', {}).get('slayer_bosses', {}).get('spider', {}).get('xp')
        if isinstance(slayer_spider, (int, float)):
            return int(slayer_spider)
        return None

class SlayerWolfProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Wolf"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_wolf = player_data.get('slayer', {}).get('slayer_bosses', {}).get('wolf', {}).get('xp')
        if isinstance(slayer_wolf, (int, float)):
            return int(slayer_wolf)
        return None

class SlayerEndermanProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Enderman"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_enderman = player_data.get('slayer', {}).get('slayer_bosses', {}).get('enderman', {}).get('xp')
        if isinstance(slayer_enderman, (int, float)):
            return int(slayer_enderman)
        return None

class SlayerVampireProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Vampire"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_vampire = player_data.get('slayer', {}).get('slayer_bosses', {}).get('vampire', {}).get('xp')
        if isinstance(slayer_vampire, (int, float)):
            return int(slayer_vampire)
        return None

class SlayerBlazeProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Slayer Blaze"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        slayer_blaze = player_data.get('slayer', {}).get('slayer_bosses', {}).get('blaze', {}).get('xp')
        if isinstance(slayer_blaze, (int, float)):
            return int(slayer_blaze)
        return None

class CatacombProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacombs"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacombs_level = player_data.get('dungeons', {}).get('dungeon_types', {}).get('catacombs', {}).get('experience')
        if isinstance(catacombs_level, (int, float)):
            return int(catacombs_level)
        return None

class CatacombArcherProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacomb Archer"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacomb_archer = player_data.get('dungeons', {}).get('player_classes', {}).get('archer', {}).get('experience')
        if isinstance(catacomb_archer, (int, float)):
            return int(catacomb_archer)
        return None

class CatacombBerserkerProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacomb Berserker"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacomb_berserker = player_data.get('dungeons', {}).get('player_classes', {}).get('berserk', {}).get('experience')
        if isinstance(catacomb_berserker, (int, float)):
            return int(catacomb_berserker)
        return None

class CatacombHealerProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacomb Healer"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacomb_healer = player_data.get('dungeons', {}).get('player_classes', {}).get('healer', {}).get('experience')
        if isinstance(catacomb_healer, (int, float)):
            return int(catacomb_healer)
        return None

class CatacombMageProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacomb Mage"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacomb_mage = player_data.get('dungeons', {}).get('player_classes', {}).get('mage', {}).get('experience')
        if isinstance(catacomb_mage, (int, float)):
            return int(catacomb_mage)
        return None

class CatacombTankProcessor(LeaderboardProcessor):
    def get_category_name(self) -> str:
        return "Catacomb Tank"
    
    def extract_value(self, player_data: Dict, profile_data: Dict) -> Optional[int]:
        catacomb_tank = player_data.get('dungeons', {}).get('player_classes', {}).get('tank', {}).get('experience')
        if isinstance(catacomb_tank, (int, float)):
            return int(catacomb_tank)
        return None

class DataCollector:
    def __init__(self, api_client: APIClient, config: Config):
        self.api_client = api_client
        self.config = config
    
    def get_guild_members(self) -> List[str]:
        data = self.api_client.get(
            "https://api.hypixel.net/v2/guild",
            params={"id": self.config.guild_id}
        )
        
        if not data:
            raise Exception("Failed to fetch guild data")
        
        members = data.get("guild", {}).get("members", [])
        return [m["uuid"] for m in members]
    
    def get_player_profiles(self, uuid: str) -> Optional[Dict]:
        """Pobiera profile gracza"""
        return self.api_client.get(
            "https://api.hypixel.net/v2/skyblock/profiles",
            params={"uuid": uuid}
        )
    
    def collect_all_profiles(self, uuids: List[str]) -> List[Dict]:
        players_data = []
        
        with ThreadPoolExecutor(max_workers=self.config.max_workers) as executor:
            future_to_uuid = {
                executor.submit(self.get_player_profiles, uuid): uuid
                for uuid in uuids
            }
            
            for future in as_completed(future_to_uuid):
                uuid = future_to_uuid[future]
                try:
                    data = future.result()
                    players_data.append({"uuid": uuid, "data": data})
                except Exception as e:
                    print(f"Error fetching data for {uuid}: {e}")
                    players_data.append({"uuid": uuid, "data": None})
        
        return players_data


class ProfileFilter:
    @staticmethod
    def filter_active_profiles(players_data: List[Dict], game_mode: str) -> List[Dict]:
        active_profiles = []
        
        for player_entry in players_data:
            player_uuid = player_entry['uuid']
            data = player_entry['data']
            
            if not data or not data.get('success') or not data.get('profiles'):
                active_profiles.append({
                    'uuid': player_uuid,
                    'profile_data': None,
                    'members': {},
                    'status': 'Error/No Data'
                })
                continue
            
            active_profile = None
            for profile in data['profiles']:
                if profile.get('selected') and profile.get('game_mode') == game_mode:
                    active_profile = profile
                    break
            
            if active_profile:
                active_profiles.append({
                    'uuid': player_uuid,
                    'profile_id': active_profile.get('profile_id', 'Unknown'),
                    'profile_data': active_profile,
                    'members': active_profile.get('members', {}),
                    'status': f'Found Active ({game_mode})'
                })
            else:
                active_profiles.append({
                    'uuid': player_uuid,
                    'profile_data': None,
                    'members': {},
                    'status': f'No Active {game_mode} Profile'
                })
        
        return active_profiles


class FileManager:
    def __init__(self, config: Config):
        self.config = config

    def save_json(self, filename: str, data: Any) -> None:
        directory, name = os.path.split(filename)
        name = name.replace(":", "_")
        safe_path = os.path.join(directory, name)
        with open(safe_path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Saved: {safe_path}")

    def upload_to_git(self, files: List[str]) -> bool:
        try:
            repo_path = self.config.repo_path
            data_dir = os.path.join(repo_path, "data")
            os.makedirs(data_dir, exist_ok=True)
            
            for file in files:
                if os.path.exists(file):
                    shutil.copy(file, os.path.join(data_dir, file))
            
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            
            subprocess.run(["git", "-C", repo_path, "add", "."], check=True)
            subprocess.run(
                ["git", "-C", repo_path, "commit", "-m", f"Data Update - {timestamp}"],
                check=True
            )
            subprocess.run(["git", "-C", repo_path, "push"], check=True)
            
            print("Files uploaded via Git")
            return True
            
        except Exception as e:
            print(f"Git upload failed: {e}")
            return False


class LeaderboardManager:
    
    def __init__(self, config: Config):
        self.config = config
        self.rate_limiter = RateLimiter(config.request_limit)
        self.api_client = APIClient(config.api_key, self.rate_limiter)
        self.username_cache = UsernameCache()
        self.data_collector = DataCollector(self.api_client, config)
        self.file_manager = FileManager(config)
        
        self.processors: List[LeaderboardProcessor] = [
            SkyblockLevelProcessor(self.username_cache),
            NucleusRunsProcessor(self.username_cache),
            SkillProcessor(self.username_cache, 'combat'),
            SkillProcessor(self.username_cache, 'farming'),
            SkillProcessor(self.username_cache, 'fishing'),
            SkillProcessor(self.username_cache, 'mining'),
            SkillProcessor(self.username_cache, 'foraging'),
            SkillProcessor(self.username_cache, 'enchanting'),
            SkillProcessor(self.username_cache, 'alchemy'),
            SkillProcessor(self.username_cache, 'carpentry'),
            SkillProcessor(self.username_cache, 'taming'),
            AccessoryBagStorageProcessor(self.username_cache),
            SlayerZombieProcessor(self.username_cache),
            SlayerSpiderProcessor(self.username_cache), 
            SlayerWolfProcessor(self.username_cache),
            SlayerEndermanProcessor(self.username_cache),
            SlayerVampireProcessor(self.username_cache),
            SlayerBlazeProcessor(self.username_cache),
            CatacombProcessor(self.username_cache),
            CatacombArcherProcessor(self.username_cache),
            CatacombBerserkerProcessor(self.username_cache),
            CatacombHealerProcessor(self.username_cache),
            CatacombMageProcessor(self.username_cache),
            CatacombTankProcessor(self.username_cache),
            
            # Collection 
            # Farming
            CollectionProcessor(self.username_cache, 'CACTUS'),
            CollectionProcessor(self.username_cache, 'CARROT_ITEM'),
            CollectionProcessor(self.username_cache, 'INK_SACK:3'),
            CollectionProcessor(self.username_cache, 'FEATHER'),
            CollectionProcessor(self.username_cache, 'LEATHER'),
            CollectionProcessor(self.username_cache, 'MELON'),
            CollectionProcessor(self.username_cache, 'MUSHROOM_COLLECTION'),
            CollectionProcessor(self.username_cache, 'MUTTON'),
            CollectionProcessor(self.username_cache, 'NETHER_STALK'),
            CollectionProcessor(self.username_cache, 'POTATO_ITEM'),
            CollectionProcessor(self.username_cache, 'PUMPKIN'),
            CollectionProcessor(self.username_cache, 'RAW_CHICKEN'),
            CollectionProcessor(self.username_cache, 'PORK'),
            CollectionProcessor(self.username_cache, 'RABBIT'),
            CollectionProcessor(self.username_cache, 'SEEDS'),
            CollectionProcessor(self.username_cache, 'SUGAR_CANE'),
            CollectionProcessor(self.username_cache, 'WHEAT'),
            CollectionProcessor(self.username_cache, 'WHEAT'),
            CollectionProcessor(self.username_cache, 'DOUBLE_PLANT'),
            CollectionProcessor(self.username_cache, 'WILD_ROSE'),
            CollectionProcessor(self.username_cache, 'MOONFLOWER'),
            
        ]
    
    def run(self) -> None:
        print("=== Starting Hypixel Leaderboard Update ===")
        subprocess.run(["git", "-C", self.config.repo_path, "pull"], check=True)
        print("\n[1/4] Fetching guild members...")
        uuids = self.data_collector.get_guild_members()
        print(f"Found {len(uuids)} members")
        
        print("\n[2/4] Collecting player profiles...")
        players_data = self.data_collector.collect_all_profiles(uuids)
        
        print("\n[3/4] Filtering active profiles...")
        active_profiles = ProfileFilter.filter_active_profiles(
            players_data,
            self.config.game_mode
        )
        
        self.file_manager.save_json(
            "active_ironman_profiles.json",
            {
                "data": active_profiles,
                "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            }
        )
        
        print("\n[4/4] Generating leaderboards...")
        leaderboards = {}
        files_to_upload = ["active_ironman_profiles.json"]
        
        for processor in self.processors:
            category = processor.get_category_name()
            print(f"\nProcessing: {category}")
            
            leaderboard = processor.process(active_profiles)
            leaderboards[category] = leaderboard
            
            filename = f"{category.lower().replace(' ', '_')}_leaderboard.json"
            self.file_manager.save_json(filename, leaderboard)
            files_to_upload.append(filename)
        
        all_leaderboards_file = "all_leaderboards.json"
        self.file_manager.save_json(all_leaderboards_file, {
            "leaderboards": leaderboards,
            "lastUpdated": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        })
        files_to_upload.append(all_leaderboards_file)
        
        print("\n=== Uploading to Git ===")
        self.file_manager.upload_to_git(files_to_upload)
        
        print("\n=== Update Complete ===")


def main():
    config = Config()
    manager = LeaderboardManager(config)
    manager.run()


if __name__ == "__main__":
    main()
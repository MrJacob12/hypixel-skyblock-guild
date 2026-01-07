import requests, json, time, os, shutil, subprocess
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv
from datetime import datetime

load_dotenv() 

API_KEY = os.environ.get("API_KEY")
GUILD_ID = "6898ed238ea8c97d1328bb2b"
REQUEST_LIMIT = 60
last_request_time = 0
amount_requests_in_current_minute = 0

def hypixel_api(url: str, params: Optional[Dict[str, Any]] = None) -> Optional[Dict[str, Any]]:
    global last_request_time
    global amount_requests_in_current_minute

    current_time = time.time()
    if current_time - last_request_time > 60:
        amount_requests_in_current_minute = 0

    if amount_requests_in_current_minute >= REQUEST_LIMIT:
        time_to_wait = 60 - (current_time - last_request_time)
        if time_to_wait > 0:
            print(f"Query limit availability. I'm waiting {time_to_wait:.2f}s...")
            time.sleep(time_to_wait)
            last_request_time = time.time()
    try:
        headers = {
            "API-Key": f"{API_KEY}"
        }

        last_request_time = time.time()

        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 200:
            amount_requests_in_current_minute += 1

            data = response.json()
            if data.get('success', False):
                return data
            else:
                cause = data.get('cause', 'Unknown cause.')
                print(f"The API returned an error (success: false): {cause}")
                return None
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return None

def get_username_from_uuid(uuid: str) -> str:
    try:
        response = requests.get(f"https://playerdb.co/api/player/minecraft/{uuid}", timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and data.get('data', {}).get('player', {}).get('username'):
                return data['data']['player']['username']
    except Exception as e:
        print(f"Failed to fetch username for {uuid}: {e}")
    
    return uuid[:8]  # Fallback

def process_skyblock_level_data(active_profiles: List[Dict]) -> Dict:
    members_data = []
    
    for item in active_profiles:
        uuid = item.get('uuid')
        profile_data = item.get('profile_data')
        members = item.get('members', {})
        
        if not profile_data or not members or uuid not in members:
            continue
        
        player_data = members[uuid]
        leveling_exp = player_data.get('leveling', {}).get('experience')
        
        if not isinstance(leveling_exp, (int, float)):
            continue
        
        skyblock_level = int(leveling_exp / 100)
        
        username = get_username_from_uuid(uuid)
        print(f"Processing {username} (Level: {skyblock_level})")
        
        members_data.append({
            'uuid': uuid,
            'username': username,
            'level': skyblock_level
        })
    
    members_data.sort(key=lambda x: x['level'], reverse=True)
    
    leaderboard_members = []
    for index, member in enumerate(members_data):
        leaderboard_members.append({
            'rank': index + 1,
            'username': member['username'],
            'uuid': member['uuid'],
            'value': member['level'],
            'formattedValue': str(member['level'])
        })
    
    return {
        'category': 'Skyblock Level',
        'lastUpdated': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'members': leaderboard_members
    }

params = {
    "id": GUILD_ID
}

data = hypixel_api("https://api.hypixel.net/v2/guild", params)
members = data["guild"]["members"]
uuids = [m["uuid"] for m in members]

players_data = []

for uuid in uuids:
    params = {
        "uuid": uuid
    }
    players_data.append({
        "uuid": uuid,
        "data": hypixel_api("https://api.hypixel.net/v2/skyblock/profiles", params)
    })

game_mode = "ironman"
active_profiles_per_player = []

for player_entry in players_data:
    player_uuid = player_entry['uuid']
    data = player_entry['data']
    last_active_ironman_profile = None

    if not data or data.get('success') is not True or 'profiles' not in data or data['profiles'] is None:
        print(f"Error: No data or profiles for UUID {player_uuid}.")
        active_profiles_per_player.append({
            'uuid': player_uuid,
            'profile_data': None,
            'status': 'Error/No Data'
        })
        continue

    profiles = data['profiles']

    for profile_data in profiles:
        is_selected = profile_data.get('selected') is True
        current_game_mode = profile_data.get('game_mode')

        if is_selected and current_game_mode == game_mode:
            last_active_ironman_profile = profile_data
            break

    if last_active_ironman_profile:
        profile_id_from_data = last_active_ironman_profile.get('profile_id', 'Unknown ID')
        profile_members = last_active_ironman_profile.get('members', {})

        active_profiles_per_player.append({
            'uuid': player_uuid,
            'profile_id': profile_id_from_data,
            'profile_data': last_active_ironman_profile,
            'members': profile_members,
            'status': f'Found Active ({game_mode})'
        })
    else:
        active_profiles_per_player.append({
            'uuid': player_uuid,
            'profile_data': None,
            'members': {},
            'status': f'No Active {game_mode} Profile Found'
        })

skyblock_leaderboard = process_skyblock_level_data(active_profiles_per_player)

REPO_PATH = "/fern/apps/hypixel/hypixel-skyblock-guild"

FULL_DATA_FILE = "active_ironman_profiles.json"
with open(FULL_DATA_FILE, 'w', encoding='utf-8') as f:
    json.dump({
        "data": active_profiles_per_player, 
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    }, f, indent=2, ensure_ascii=False)

print(f"Full data saved: {len(active_profiles_per_player)} players to {FULL_DATA_FILE}")

LEADERBOARD_FILE = "skyblock_level_leaderboard.json"
with open(LEADERBOARD_FILE, 'w', encoding='utf-8') as f:
    json.dump(skyblock_leaderboard, f, indent=2, ensure_ascii=False)

print(f"Leaderboard saved: {len(skyblock_leaderboard['members'])} members to {LEADERBOARD_FILE}")

def upload_via_git() -> bool:
    data_dir = os.path.join(REPO_PATH, "data")
    os.makedirs(data_dir, exist_ok=True)
    
    if os.path.exists(FULL_DATA_FILE):
        shutil.copy(FULL_DATA_FILE, os.path.join(data_dir, FULL_DATA_FILE))
    
    if os.path.exists(LEADERBOARD_FILE):
        shutil.copy(LEADERBOARD_FILE, os.path.join(data_dir, LEADERBOARD_FILE))
    else:
        print("No leaderboard file.")
        return False

    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    subprocess.run(["git", "-C", REPO_PATH, "add", "."], check=True)
    subprocess.run(["git", "-C", REPO_PATH, "commit", "-m", f"Data Update - {timestamp}"], check=True)
    subprocess.run(["git", "-C", REPO_PATH, "push"], check=True)

    print("Files sent via SSH Deploy Key.")
    return True

upload_via_git()
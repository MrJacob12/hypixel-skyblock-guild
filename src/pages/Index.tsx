import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { LeaderboardData } from "@/types/leaderboard";

import SkyblockLevel from "@/leaderboards/SkyblockLevel";
import NucleusRuns from "@/leaderboards/NucleusRuns";
import Skills from "@/leaderboards/Skills";
import Networth from "@/leaderboards/Networth";
import Catacombs from "@/leaderboards/Catacombs";
import Slayer from "@/leaderboards/Slayer";
import MagicalPower from "@/leaderboards/MagicalPower";
import Collections from "@/leaderboards/Collections";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState("combat");
  const [selectedSlayer, setSelectedSlayer] = useState("zombie");
  const [selectedCatacombs, setSelectedCatacombs] = useState("catacombs");

  const [levelData, setLevelData] = useState(null);
  const [nucleusRunsData, setNucleusRunsData] = useState(null);
  const [combatSkillData, setCombatSkillData] = useState(null);
  const [farmingSkillData, setFarmingSkillData] = useState(null);
  const [fishingSkillData, setFishingSkillData] = useState(null);
  const [miningSkillData, setMiningSkillData] = useState(null);
  const [foragingSkillData, setForagingSkillData] = useState(null);
  const [enchantingSkillData, setEnchantingSkillData] = useState(null);
  const [alchemySkillData, setAlchemySkillData] = useState(null);
  const [carpentrySkillData, setCarpentrySkillData] = useState(null);
  const [tamingSkillData, setTamingSkillData] = useState(null);

  const [magicalPowerData, setMagicalPowerData] = useState(null);

  const [catacombsData, setCatacombsData] = useState(null);
  const [catacombsArcherData, setCatacombsArcherData] = useState(null);
  const [catacombsBerserkerData, setCatacombsBerserkerData] = useState(null);
  const [catacombsHealerData, setCatacombsHealerData] = useState(null);
  const [catacombsMageData, setCatacombsMageData] = useState(null);
  const [catacombsTankData, setCatacombsTankData] = useState(null);

  const [slayerZombieData, setSlayerZombieData] = useState(null);
  const [slayerSpiderData, setSlayerSpiderData] = useState(null);
  const [slayerWolfData, setSlayerWolfData] = useState(null);
  const [slayerEndermanData, setSlayerEndermanData] = useState(null);
  const [slayerVampireData, setSlayerVampireData] = useState(null);
  const [slayerBlazeData, setSlayerBlazeData] = useState(null);

  const [leaderboardData, setLeaderboardData] = useState<Record<
    string,
    LeaderboardData
  > | null>(null);

  // For testing purposes
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/active_ironman_profiles.json"
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(
          "Active Ironman Profiles:",
          data["data"][13]["members"][data["data"][13]["uuid"]]
        );
      })
      .catch((error) => {
        console.error("Error loading active ironman profiles:", error);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetch(
        "https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/all_leaderboards.json"
      )
        .then((r) => r.json())
        .then((data: Record<string, LeaderboardData>) => {
          console.log("Leaderboard Data:", data);
          setLeaderboardData(data);

          setLevelData(data["leaderboards"]["Skyblock Level"]);
          setNucleusRunsData(data["leaderboards"]["Nucleus Runs"]);
          setCombatSkillData(data["leaderboards"]["Combat Skill"]);
          setFarmingSkillData(data["leaderboards"]["Farming Skill"]);
          setFishingSkillData(data["leaderboards"]["Fishing Skill"]);
          setMiningSkillData(data["leaderboards"]["Mining Skill"]);
          setForagingSkillData(data["leaderboards"]["Foraging Skill"]);
          setEnchantingSkillData(data["leaderboards"]["Enchanting Skill"]);
          setAlchemySkillData(data["leaderboards"]["Alchemy Skill"]);
          setCarpentrySkillData(data["leaderboards"]["Carpentry Skill"]);
          setTamingSkillData(data["leaderboards"]["Taming Skill"]);
          setMagicalPowerData(data["leaderboards"]["Magical Power"]);

          setCatacombsData(data["leaderboards"]["Catacombs"]);

          setCatacombsArcherData(data["leaderboards"]["Catacomb Archer"]);
          setCatacombsBerserkerData(data["leaderboards"]["Catacomb Berserker"]);
          setCatacombsHealerData(data["leaderboards"]["Catacomb Healer"]);
          setCatacombsMageData(data["leaderboards"]["Catacomb Mage"]);
          setCatacombsTankData(data["leaderboards"]["Catacomb Tank"]);
          setSlayerZombieData(data["leaderboards"]["Slayer Zombie"]);
          setSlayerSpiderData(data["leaderboards"]["Slayer Spider"]);
          setSlayerWolfData(data["leaderboards"]["Slayer Wolf"]);
          setSlayerEndermanData(data["leaderboards"]["Slayer Enderman"]);
          setSlayerVampireData(data["leaderboards"]["Slayer Vampire"]);
          setSlayerBlazeData(data["leaderboards"]["Slayer Blaze"]);
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-secondary/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Guild Leaderboards
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Hypixel Skyblock</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-10">
        <div className="text-center py-8 text-muted-foreground">
          <Tabs defaultValue="skyblock-level" className="w-full">
            <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
              <TabsTrigger value="skyblock-level">
                <img
                  src="https://sky.shiiyu.moe/api/head/2e2cc42015e6678f8fd49ccc01fbf787f1ba2c32bcf559a015332fc5db50"
                  className="w-6"
                />
                Skyblock Level
              </TabsTrigger>
              <TabsTrigger value="networth" disabled>
                <span className="text-foreground text-amber-500">℻</span>Net
                Worth
              </TabsTrigger>
              <TabsTrigger value="skills">
                <img
                  src="https://sky.shiiyu.moe/api/item/IRON_PICKAXE"
                  className="w-6 disable-blur"
                />
                Skills
              </TabsTrigger>
              <TabsTrigger value="catacombs">
                <img
                  src="https://sky.shiiyu.moe/api/head/964e1c3e315c8d8fffc37985b6681c5bd16a6f97ffd07199e8a05efbef103793"
                  className="w-6 disable-blur"
                />
                Catacombs
              </TabsTrigger>
              <TabsTrigger value="slayers">
                <img
                  src="https://sky.shiiyu.moe/api/item/BLAZE_ROD"
                  className="w-6 disable-blur"
                />
                Slayers
              </TabsTrigger>
              <TabsTrigger value="magical-power">
                <img
                  src="https://wiki.hypixel.net/images/3/3a/SkyBlock_items_learn_new_power_green.png"
                  className="w-6 disable-blur"
                />
                Magical Power
              </TabsTrigger>
              <TabsTrigger value="collections">
                <img
                  src="https://wiki.hypixel.net/images/0/01/Minecraft_items_painting.png"
                  className="w-6 disable-blur"
                />
                Collections
              </TabsTrigger>
              <TabsTrigger value="nucleus-runs">
                <img
                  src="https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/divan_alloy.png"
                  className="w-6 disable-blur"
                />
                Nucleus Runs
              </TabsTrigger>
            </TabsList>

            <SkyblockLevel isLoading={isLoading} levelData={levelData} />

            <NucleusRuns
              isLoading={isLoading}
              nucleusRunsData={nucleusRunsData}
            />

            <Skills
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
              isLoading={isLoading}
              combatSkillData={combatSkillData}
              farmingSkillData={farmingSkillData}
              fishingSkillData={fishingSkillData}
              miningSkillData={miningSkillData}
              foragingSkillData={foragingSkillData}
              enchantingSkillData={enchantingSkillData}
              alchemySkillData={alchemySkillData}
              carpentrySkillData={carpentrySkillData}
              tamingSkillData={tamingSkillData}
            />

            <Networth />

            <Catacombs
              selectedCatacombs={selectedCatacombs}
              setSelectedCatacombs={setSelectedCatacombs}
              isLoading={isLoading}
              catacombsData={catacombsData}
              catacombsArcherData={catacombsArcherData}
              catacombsBerserkerData={catacombsBerserkerData}
              catacombsHealerData={catacombsHealerData}
              catacombsMageData={catacombsMageData}
              catacombsTankData={catacombsTankData}
            />

            <Slayer
              isLoading={isLoading}
              selectedSlayer={selectedSlayer}
              setSelectedSlayer={setSelectedSlayer}
              slayerZombieData={slayerZombieData}
              slayerSpiderData={slayerSpiderData}
              slayerWolfData={slayerWolfData}
              slayerEndermanData={slayerEndermanData}
              slayerVampireData={slayerVampireData}
              slayerBlazeData={slayerBlazeData}
            />

            <MagicalPower
              isLoading={isLoading}
              magicalPowerData={magicalPowerData}
            />

            <Collections
              isLoading={isLoading}
              leaderboardData={leaderboardData}
            />
          </Tabs>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Data comes from Hypixel API
          </p>

          <p className="text-xs text-muted-foreground text-center">
            Created by{" "}
            <a href="https://github.com/MrJacob12/" target="_blank">
              Jacob
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

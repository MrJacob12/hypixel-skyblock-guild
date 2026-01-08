import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { LeaderboardData } from "@/types/leaderboard";

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

  // For testing purposes
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/active_ironman_profiles.json"
    )
      .then((r) => r.json())
      .then((data) => {
        console.log(
          "Active Ironman Profiles:",
          data["data"][0]["members"][data["data"][0]["uuid"]]
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

          // setCatacombsData(data["leaderboards"]["Catacombs"]);

          setCatacombsArcherData(data["leaderboards"]["Catacombs Archer"]);
          setCatacombsBerserkerData(
            data["leaderboards"]["Catacombs Berserker"]
          );
          setCatacombsHealerData(data["leaderboards"]["Catacombs Healer"]);
          setCatacombsMageData(data["leaderboards"]["Catacombs Mage"]);
          setCatacombsTankData(data["leaderboards"]["Catacombs Tank"]);
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

  const getSkillData = () => {
    switch (selectedSkill) {
      case "combat":
        return combatSkillData;
      case "farming":
        return farmingSkillData;
      case "fishing":
        return fishingSkillData;
      case "mining":
        return miningSkillData;
      case "foraging":
        return foragingSkillData;
      case "enchanting":
        return enchantingSkillData;
      case "alchemy":
        return alchemySkillData;
      case "carpentry":
        return carpentrySkillData;
      case "taming":
        return tamingSkillData;
      default:
        return null;
    }
  };

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
        <Tabs defaultValue="skyblock-level" className="w-full">
          <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
            <TabsTrigger value="skyblock-level">
              <img
                src="https://sky.shiiyu.moe/api/head/2e2cc42015e6678f8fd49ccc01fbf787f1ba2c32bcf559a015332fc5db50"
                className="w-6"
              />
              Skyblock Level
            </TabsTrigger>
            <TabsTrigger value="networth">
              <span className="text-foreground text-amber-500">℻</span>Net Worth
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
            <TabsTrigger value="nucleus-runs">
              <img
                src="https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/divan_alloy.png"
                className="w-6 disable-blur"
              />
              Nucleus Runs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skyblock-level" className="animate-fade-in">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading data...
              </div>
            ) : levelData ? (
              <LeaderboardCard data={levelData} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No data available
              </div>
            )}
          </TabsContent>

          <TabsContent value="nucleus-runs" className="animate-fade-in">
            {isLoading ? (
              <div className="text-center py-8 text-muted-foreground">
                Loading data...
              </div>
            ) : nucleusRunsData ? (
              <LeaderboardCard data={nucleusRunsData} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No data available
              </div>
            )}
          </TabsContent>

          <TabsContent value="skills" className="animate-fade-in">
            <Tabs value={selectedSkill} onValueChange={setSelectedSkill}>
              <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                <TabsTrigger value="combat">
                  <img
                    src="https://sky.shiiyu.moe/api/item/STONE_SWORD"
                    className="w-8 disable-blur"
                  />
                  Combat
                </TabsTrigger>
                <TabsTrigger value="farming">
                  <img
                    src="https://sky.shiiyu.moe/api/item/WHEAT"
                    className="w-8 disable-blur"
                  />
                  Farming
                </TabsTrigger>
                <TabsTrigger value="fishing">
                  <img
                    src="https://sky.shiiyu.moe/api/item/FISHING_ROD"
                    className="w-8 disable-blur"
                  />
                  Fishing
                </TabsTrigger>
                <TabsTrigger value="mining">
                  <img
                    src="https://sky.shiiyu.moe/api/item/IRON_PICKAXE"
                    className="w-8 disable-blur"
                  />
                  Mining
                </TabsTrigger>
                <TabsTrigger value="foraging">
                  <img
                    src="https://sky.shiiyu.moe/api/item/SAPLING:3"
                    className="w-8 disable-blur"
                  />
                  Foraging
                </TabsTrigger>
                <TabsTrigger value="enchanting">
                  <img
                    src="https://sky.shiiyu.moe/api/item/ENCHANTED_BOOK"
                    className="w-8 disable-blur"
                  />
                  Enchanting
                </TabsTrigger>
                <TabsTrigger value="alchemy">
                  <img
                    src="https://sky.shiiyu.moe/api/item/BREWING_STAND"
                    className="w-8 disable-blur"
                  />
                  Alchemy
                </TabsTrigger>
                <TabsTrigger value="carpentry">
                  <img
                    src="https://sky.shiiyu.moe/api/item/CRAFTING_TABLE"
                    className="w-8 disable-blur"
                  />
                  Carpentry
                </TabsTrigger>
                <TabsTrigger value="taming">
                  <img
                    src="https://sky.shiiyu.moe/api/item/SPAWN_EGG"
                    className="w-8 disable-blur"
                  />
                  Taming
                </TabsTrigger>
              </TabsList>

              {[
                "combat",
                "farming",
                "fishing",
                "mining",
                "foraging",
                "enchanting",
                "alchemy",
                "carpentry",
                "taming",
              ].map((skill) => (
                <TabsContent key={skill} value={skill}>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading {skill.charAt(0).toUpperCase() + skill.slice(1)}{" "}
                      data...
                    </div>
                  ) : getSkillData() ? (
                    <LeaderboardCard data={getSkillData()} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No {skill.charAt(0).toUpperCase() + skill.slice(1)} data
                      available
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </TabsContent>

          <TabsContent value="networth" className="animate-fade-in">
            <div className="text-center py-8 text-muted-foreground">
              Net Worth leaderboard **NOT** coming soon!
            </div>
          </TabsContent>

          <TabsContent value="catacombs" className="animate-fade-in">
            <div className="text-center py-8 text-muted-foreground">
              <Tabs
                value={selectedCatacombs}
                onValueChange={setSelectedCatacombs}
              >
                <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                  <TabsTrigger value="catacombs">
                    <img
                      src="https://sky.shiiyu.moe/api/head/964e1c3e315c8d8fffc37985b6681c5bd16a6f97ffd07199e8a05efbef103793"
                      className="w-8 disable-blur"
                    />
                    Catacombs
                  </TabsTrigger>
                  <TabsTrigger value="archer">
                    <img
                      src="https://sky.shiiyu.moe/api/item/BOW"
                      className="w-8 disable-blur"
                    />
                    Archer
                  </TabsTrigger>
                  <TabsTrigger value="berserker">
                    <img
                      src="https://sky.shiiyu.moe/api/item/IRON_SWORD"
                      className="w-8 disable-blur"
                    />
                    Berserker
                  </TabsTrigger>
                  <TabsTrigger value="healer">
                    <img
                      src="https://sky.shiiyu.moe/api/potion/normal/f52423"
                      className="w-8 disable-blur"
                    />
                    Healer
                  </TabsTrigger>
                  <TabsTrigger value="mage">
                    <img
                      src="https://sky.shiiyu.moe/api/item/BLAZE_ROD"
                      className="w-8 disable-blur"
                    />
                    Mage
                  </TabsTrigger>
                  <TabsTrigger value="tank">
                    <img
                      src="https://sky.shiiyu.moe/api/leather/chestplate/955e3b"
                      className="w-8 disable-blur"
                    />
                    Tank
                  </TabsTrigger>
                </TabsList>
                <div className="text-center py-8 text-muted-foreground">
                  {`Catacombs (${
                    selectedCatacombs.charAt(0).toUpperCase() +
                    selectedCatacombs.slice(1)
                  }) leaderboard coming soon!`}
                </div>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="slayers" className="animate-fade-in">
            <div className="text-center py-8 text-muted-foreground">
              <Tabs value={selectedSlayer} onValueChange={setSelectedSlayer}>
                <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                  <TabsTrigger value="zombie">
                    <img
                      src="https://sky.shiiyu.moe/api/head/1fc0184473fe882d2895ce7cbc8197bd40ff70bf10d3745de97b6c2a9c5fc78f"
                      className="w-8"
                    />
                    Zombie
                  </TabsTrigger>
                  <TabsTrigger value="spider">
                    <img
                      src="https://sky.shiiyu.moe/api/head/9d7e3b19ac4f3dee9c5677c135333b9d35a7f568b63d1ef4ada4b068b5a25"
                      className="w-8"
                    />
                    Spider
                  </TabsTrigger>
                  <TabsTrigger value="wolf">
                    <img
                      src="https://sky.shiiyu.moe/api/head/f83a2aa9d3734b919ac24c9659e5e0f86ecafbf64d4788cfa433bbec189e8"
                      className="w-8"
                    />
                    Wolf
                  </TabsTrigger>
                  <TabsTrigger value="enderman">
                    <img
                      src="https://sky.shiiyu.moe/api/head/1b09a3752510e914b0bdc9096b392bb359f7a8e8a9566a02e7f66faff8d6f89e"
                      className="w-8"
                    />
                    Enderman
                  </TabsTrigger>
                  <TabsTrigger value="vampire">
                    <img
                      src="https://sky.shiiyu.moe/api/head/5aa29ea961757dc3c90bfabf302c5abe9d308fb4a7d3864e5788ad2cc9160aa2"
                      className="w-8"
                    />
                    Vampire
                  </TabsTrigger>
                  <TabsTrigger value="blaze">
                    <img
                      src="https://sky.shiiyu.moe/api/head/b20657e24b56e1b2f8fc219da1de788c0c24f36388b1a409d0cd2d8dba44aa3b"
                      className="w-8"
                    />
                    Blaze
                  </TabsTrigger>
                </TabsList>
                <div className="text-center py-8 text-muted-foreground">
                  {`Slayer (${
                    selectedSlayer.charAt(0).toUpperCase() +
                    selectedSlayer.slice(1)
                  }) leaderboard coming soon!`}
                </div>
              </Tabs>
            </div>
          </TabsContent>

          <TabsContent value="magical-power" className="animate-fade-in">
            <div className="text-center py-8 text-muted-foreground">
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading Magical Power data...
                </div>
              ) : magicalPowerData ? (
                <LeaderboardCard data={magicalPowerData} />
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No Magical Power data available
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
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

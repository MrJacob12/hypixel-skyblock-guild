import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { LeaderboardData } from "@/types/leaderboard";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSkill, setSelectedSkill] = useState("combat");

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

  // useEffect(() => {
  //   const baseUrl =
  //     "https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/";

  //   const fetchData = async () => {
  //     setIsLoading(true);

  //     try {
  //       const [
  //         level,
  //         nucleus,
  //         combat,
  //         farming,
  //         fishing,
  //         mining,
  //         foraging,
  //         enchanting,
  //         alchemy,
  //         carpentry,
  //         taming,
  //       ] = await Promise.all([
  //         fetch(`${baseUrl}skyblock_level_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}nucleus_runs_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}combat_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}farming_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}fishing_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}mining_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}foraging_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}enchanting_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}alchemy_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}carpentry_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //         fetch(`${baseUrl}taming_skill_leaderboard.json`, {
  //           cache: "no-store",
  //         }).then((r) => r.json()),
  //       ]);

  //       setLevelData(level);
  //       setNucleusRunsData(nucleus);
  //       setCombatSkillData(combat);
  //       setFarmingSkillData(farming);
  //       setFishingSkillData(fishing);
  //       setMiningSkillData(mining);
  //       setForagingSkillData(foraging);
  //       setEnchantingSkillData(enchanting);
  //       setAlchemySkillData(alchemy);
  //       setCarpentrySkillData(carpentry);
  //       setTamingSkillData(taming);
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      fetch("https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/all_leaderboards.json")
        .then((r) => r.json())
        .then((data: Record<string, LeaderboardData>) => {
          console.log(data);
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
        })
        .catch((error) => {
          console.error("Error loading data:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
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
          <TabsList className="mb-6 bg-secondary/50">
            <TabsTrigger value="skyblock-level"><img src="https://sky.shiiyu.moe/api/head/2e2cc42015e6678f8fd49ccc01fbf787f1ba2c32bcf559a015332fc5db50" className="w-6" />Skyblock Level</TabsTrigger>
            <TabsTrigger value="skills"><img src="https://sky.shiiyu.moe/api/item/IRON_PICKAXE" className="w-6" />Skills</TabsTrigger>
            <TabsTrigger value="nucleus-runs"><img src="https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/divan_alloy.png" className="w-6 disable-blur" />Nucleus Runs</TabsTrigger>
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
                <TabsTrigger value="combat"><img src="https://sky.shiiyu.moe/api/item/STONE_SWORD" className="w-8" />Combat</TabsTrigger>
                <TabsTrigger value="farming"><img src="https://sky.shiiyu.moe/api/item/WHEAT" className="w-8" />Farming</TabsTrigger>
                <TabsTrigger value="fishing"><img src="https://sky.shiiyu.moe/api/item/FISHING_ROD" className="w-8" />Fishing</TabsTrigger>
                <TabsTrigger value="mining"><img src="https://sky.shiiyu.moe/api/item/IRON_PICKAXE" className="w-8" />Mining</TabsTrigger>
                <TabsTrigger value="foraging"><img src="https://sky.shiiyu.moe/api/item/SAPLING:3" className="w-8" />Foraging</TabsTrigger>
                <TabsTrigger value="enchanting"><img src="https://sky.shiiyu.moe/api/item/ENCHANTED_BOOK" className="w-8" />Enchanting</TabsTrigger>
                <TabsTrigger value="alchemy"><img src="https://sky.shiiyu.moe/api/item/BREWING_STAND" className="w-8" />Alchemy</TabsTrigger>
                <TabsTrigger value="carpentry"><img src="https://sky.shiiyu.moe/api/item/CRAFTING_TABLE" className="w-8" />Carpentry</TabsTrigger>
                <TabsTrigger value="taming"><img src="https://sky.shiiyu.moe/api/item/SPAWN_EGG" className="w-8" />Taming</TabsTrigger>
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
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Data comes from Hypixel API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

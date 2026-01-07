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

  useEffect(() => {
    const baseUrl =
      "https://raw.githubusercontent.com/MrJacob12/hypixel-skyblock-guild/refs/heads/main/data/";

    const fetchData = async () => {
      setIsLoading(true);

      try {
        const [
          level,
          nucleus,
          combat,
          farming,
          fishing,
          mining,
          foraging,
          enchanting,
          alchemy,
          carpentry,
          taming,
        ] = await Promise.all([
          fetch(`${baseUrl}skyblock_level_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}nucleus_runs_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}combat_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}farming_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}fishing_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}mining_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}foraging_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}enchanting_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}alchemy_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}carpentry_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
          fetch(`${baseUrl}taming_skill_leaderboard.json`, {
            cache: "no-store",
          }).then((r) => r.json()),
        ]);

        setLevelData(level);
        setNucleusRunsData(nucleus);
        setCombatSkillData(combat);
        setFarmingSkillData(farming);
        setFishingSkillData(fishing);
        setMiningSkillData(mining);
        setForagingSkillData(foraging);
        setEnchantingSkillData(enchanting);
        setAlchemySkillData(alchemy);
        setCarpentrySkillData(carpentry);
        setTamingSkillData(taming);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
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
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="skyblock-level" className="w-full">
          <TabsList className="mb-6 bg-secondary/50">
            <TabsTrigger value="skyblock-level">Skyblock Level</TabsTrigger>
            <TabsTrigger value="nucleus-runs">Nucleus Runs</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
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
                <TabsTrigger value="combat">Combat</TabsTrigger>
                <TabsTrigger value="farming">Farming</TabsTrigger>
                <TabsTrigger value="fishing">Fishing</TabsTrigger>
                <TabsTrigger value="mining">Mining</TabsTrigger>
                <TabsTrigger value="foraging">Foraging</TabsTrigger>
                <TabsTrigger value="enchanting">Enchanting</TabsTrigger>
                <TabsTrigger value="alchemy">Alchemy</TabsTrigger>
                <TabsTrigger value="carpentry">Carpentry</TabsTrigger>
                <TabsTrigger value="taming">Taming</TabsTrigger>
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

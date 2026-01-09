import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Skills = ({
  selectedSkill,
  setSelectedSkill,
  isLoading,
  combatSkillData,
  farmingSkillData,
  fishingSkillData,
  miningSkillData,
  foragingSkillData,
  enchantingSkillData,
  alchemySkillData,
  carpentrySkillData,
  tamingSkillData,
}) => {
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
                Loading {skill.charAt(0).toUpperCase() + skill.slice(1)} data...
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
  );
};

export default Skills;

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Catacombs = ({
  selectedCatacombs,
  setSelectedCatacombs,
  isLoading,
  catacombsData,
  catacombsArcherData,
  catacombsBerserkerData,
  catacombsHealerData,
  catacombsMageData,
  catacombsTankData,
}) => {
  const getCatacombsData = () => {
    switch (selectedCatacombs) {
      case "catacombs":
        return catacombsData;
      case "archer":
        return catacombsArcherData;
      case "berserker":
        return catacombsBerserkerData;
      case "healer":
        return catacombsHealerData;
      case "mage":
        return catacombsMageData;
      case "tank":
        return catacombsTankData;
      default:
        return;
    }
  };

  return (
    <TabsContent value="catacombs" className="animate-fade-in">
      <div className="text-center py-8 text-muted-foreground">
        <Tabs value={selectedCatacombs} onValueChange={setSelectedCatacombs}>
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
            <TabsContent value={selectedCatacombs}>
              {[
                "catacombs",
                "archer",
                "berserker",
                "healer",
                "mage",
                "tank",
              ].map((role) => (
                <TabsContent key={role} value={role}>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                      data...
                    </div>
                  ) : getCatacombsData() ? (
                    <LeaderboardCard data={getCatacombsData()} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No {role.charAt(0).toUpperCase() + role.slice(1)} data
                      available
                    </div>
                  )}
                </TabsContent>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </TabsContent>
  );
};

export default Catacombs;

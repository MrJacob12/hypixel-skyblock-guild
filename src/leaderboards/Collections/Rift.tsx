import React, { memo } from "react";
import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeaderboardData } from "@/types/leaderboard";

const Rift = ({
  isLoading,
  leaderboardData,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null;
}) => {
  const [selectedRiftCollection, setSelectedRiftCollection] =
    React.useState("agaricus_cap");

  const getRiftIcon = (item: string) => {
    switch (item) {
      case "Agaricus Cap":
        return "https://wiki.hypixel.net/images/8/84/SkyBlock_items_agaricus_cap.png";
      case "Caducous Stem":
        return "https://wiki.hypixel.net/images/2/2c/Minecraft_items_rose_bush.png";
      case "Half Eaten Carrot":
        return "https://wiki.hypixel.net/images/7/7b/Minecraft_items_carrot.png";
      case "Hemovibe":
        return "https://wiki.hypixel.net/images/1/1d/Minecraft_items_redstone_ore.png";
      case "Living Metal Heart":
        return "https://wiki.hypixel.net/images/f/f1/SkyBlock_items_metal_heart.png";
      case "Timite":
        return "https://wiki.hypixel.net/images/6/63/SkyBlock_items_timite.png";
      case "Wilted Berberis":
        return "https://wiki.hypixel.net/images/2/2f/Minecraft_items_dead_bush.png";
      default:
        return "";
    }
  };

  const riftItems = [
    "Agaricus Cap",
    "Caducous Stem",
    "Half Eaten Carrot",
    "Hemovibe",
    "Living Metal Heart",
    "Timite",
    "Wilted Berberis",
  ];

  const getRiftCollectionData = () => {
    if (!leaderboardData) return null;

    switch (selectedRiftCollection) {
      case "agaricus_cap":
        return leaderboardData
          ? {
              category: "Agaricusap Collection",
              members:
                leaderboardData.leaderboards["Agaricus_cap Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "caducous_stem":
        return leaderboardData
          ? {
              category: "Caducous Stem Collection",
              members:
                leaderboardData.leaderboards["Caducous_stem Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "half_eaten_carrot":
        return leaderboardData
          ? {
              category: "Half-Eaten Carrot Collection",
              members:
                leaderboardData.leaderboards["Half_eaten_carrot Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "hemovibe":
        return leaderboardData.leaderboards["Hemovibe Collection"];
      case "living_metal_heart":
        return leaderboardData
          ? {
              category: "Living Metal Heart Collection",
              members:
                leaderboardData.leaderboards["Metal_heart Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "timite":
        return leaderboardData.leaderboards["Timite Collection"];
      case "wilted_berberis":
        return leaderboardData
          ? {
              category: "Wilted Berberis Collection",
              members:
                leaderboardData.leaderboards["Wilted_berberis Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      <TabsContent value="rift" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          {isLoading ? (
            "Loading rift leaderboards..."
          ) : (
            <Tabs
              value={selectedRiftCollection}
              onValueChange={setSelectedRiftCollection}
            >
              <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                {riftItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsTrigger key={value} value={value}>
                      <img
                        src={getRiftIcon(item)}
                        className="w-8 disable-blur"
                        alt={item}
                      />
                      {item}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="mt-8">
                {riftItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsContent key={value} value={value}>
                      <LeaderboardCard data={getRiftCollectionData()} />
                    </TabsContent>
                  );
                })}
              </div>
            </Tabs>
          )}
        </div>
      </TabsContent>
    </div>
  );
};

export default memo(Rift);

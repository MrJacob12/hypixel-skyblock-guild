import React, { memo } from "react";
import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeaderboardData } from "@/types/leaderboard";

const Foraging = ({
  isLoading,
  leaderboardData,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null;
}) => {
  const [selectedForagingCollection, setSelectedForagingCollection] =
    React.useState("oak_log");

  const getForagingIcon = (item: string) => {
    switch (item) {
      case "Oak Log":
        return "https://wiki.hypixel.net/images/8/8d/Minecraft_items_oak_log.png";
      case "Birch Log":
        return "https://wiki.hypixel.net/images/0/0c/Minecraft_items_birch_log.png";
      case "Spruce Log":
        return "https://wiki.hypixel.net/images/5/5d/Minecraft_items_spruce_log.png";
      case "Dark Oak Log":
        return "https://wiki.hypixel.net/images/0/08/Minecraft_items_dark_oak_log.png";
      case "Jungle Log":
        return "https://wiki.hypixel.net/images/d/d5/Minecraft_items_jungle_log.png";
      case "Acacia Log":
        return "https://wiki.hypixel.net/images/b/b6/Minecraft_items_acacia_log.png";
      case "Fig Log":
        return "https://wiki.hypixel.net/images/6/60/Minecraft_items_stripped_spruce_log.png";
      case "Tender Wood":
        return "https://wiki.hypixel.net/images/a/a4/SkyBlock_items_tender_wood.png";
      case "Mangrove Log":
        return "https://wiki.hypixel.net/images/b/b8/Minecraft_items_mangrove_log.png";
      case "Vinesap":
        return "https://wiki.hypixel.net/images/f/f1/SkyBlock_items_vinesap.png";
      case "Lushlilac":
        return "https://wiki.hypixel.net/images/3/30/SkyBlock_items_lushlilac.png";
      case "Sea Lumies":
        return "https://wiki.hypixel.net/images/4/42/Minecraft_items_sea_pickle.png";
      default:
        return "";
    }
  };

  const foragingItems = [
    "Oak Log",
    "Birch Log",
    "Spruce Log",
    "Dark Oak Log",
    "Jungle Log",
    "Acacia Log",
    "Fig Log",
    "Tender Wood",
    "Mangrove Log",
    "Vinesap",
    "Lushlilac",
    "Sea Lumies",
  ];

  const getForagingCollectionData = () => {
    if (!leaderboardData) return null;

    switch (selectedForagingCollection) {
      case "oak_log":
        return leaderboardData
          ? {
              category: "Oak Log Collection",
              members: leaderboardData.leaderboards["Log Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "birch_log":
        return leaderboardData
          ? {
              category: "Birch Log Collection",
              members:
                leaderboardData.leaderboards["Log:2 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "spruce_log":
        return leaderboardData
          ? {
              category: "Spruce Log Collection",
              members:
                leaderboardData.leaderboards["Log:1 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "dark_oak_log":
        return leaderboardData
          ? {
              category: "Dark Oak Log Collection",
              members:
                leaderboardData.leaderboards["Log_2:1 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "jungle_log":
        return leaderboardData
          ? {
              category: "Jungle Log Collection",
              members:
                leaderboardData.leaderboards["Log:3 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "acacia_log":
        return leaderboardData
          ? {
              category: "Acacia Log Collection",
              members:
                leaderboardData.leaderboards["Log_2 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "fig_log":
        return leaderboardData
          ? {
              category: "Fig Log Collection",
              members:
                leaderboardData.leaderboards["Fig_log Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;

      case "tender_wood":
        return leaderboardData
          ? {
              category: "Tender Wood Collection",
              members:
                leaderboardData.leaderboards["Tender_wood Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "mangrove_log":
        return leaderboardData
          ? {
              category: "Mangrove Log Collection",
              members:
                leaderboardData.leaderboards["Mangrove_log Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;

      case "vinesap":
        return leaderboardData.leaderboards["Vinesap Collection"];
      case "lushlilac":
        return leaderboardData.leaderboards["Lushlilac Collection"];
      case "sea_lumies":
        return leaderboardData
          ? {
              category: "Sea Lumies Collection",
              members:
                leaderboardData.leaderboards["Sea_lumies Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      <TabsContent value="foraging" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          {isLoading ? (
            "Loading foraging leaderboards..."
          ) : (
            <Tabs
              value={selectedForagingCollection}
              onValueChange={setSelectedForagingCollection}
            >
              <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                {foragingItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsTrigger key={value} value={value}>
                      <img
                        src={getForagingIcon(item)}
                        className="w-8 disable-blur"
                        alt={item}
                      />
                      {item}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="mt-8">
                {foragingItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsContent key={value} value={value}>
                      <LeaderboardCard data={getForagingCollectionData()} />
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

export default Foraging;

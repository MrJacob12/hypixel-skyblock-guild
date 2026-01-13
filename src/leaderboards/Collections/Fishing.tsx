import React, { memo } from "react";
import LeaderboardCard from "@/components/LeaderboardCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeaderboardData } from "@/types/leaderboard";

const Fishing = ({
  isLoading,
  leaderboardData,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null;
}) => {
  const [selectedFishingCollection, setSelectedFishingCollection] =
    React.useState("clay_ball");

  const getFishingIcon = (item: string) => {
    switch (item) {
      case "Clay Ball":
        return "https://wiki.hypixel.net/images/8/84/Minecraft_items_clay_ball.png";
      case "Ink Sac":
        return "https://wiki.hypixel.net/images/5/5b/Minecraft_items_ink_sac.png";
      case "Lily Pad":
        return "https://wiki.hypixel.net/images/c/cd/Minecraft_items_lily_pad.png";
      case "Magmafish":
        return "https://wiki.hypixel.net/images/5/52/SkyBlock_items_magma_fish.png";
      case "Prismarine Crystals":
        return "https://wiki.hypixel.net/images/0/06/Minecraft_items_prismarine_crystals.png";
      case "Prismarine Shard":
        return "https://wiki.hypixel.net/images/7/78/Minecraft_items_prismarine_shard.png";
      case "Pufferfish":
        return "https://wiki.hypixel.net/images/b/ba/Minecraft_items_pufferfish.png";
      case "Raw Cod":
        return "https://wiki.hypixel.net/images/0/02/Minecraft_items_raw_cod.png";
      case "Raw Salmon":
        return "https://wiki.hypixel.net/images/8/8e/Minecraft_items_raw_salmon.png";
      case "Sponge":
        return "https://wiki.hypixel.net/images/0/06/Minecraft_items_sponge.png";
      case "Tropical Fish":
        return "https://wiki.hypixel.net/images/6/6e/Minecraft_items_tropical_fish.png";
      default:
        return "";
    }
  };

  const fishingItems = [
    "Clay Ball",
    "Ink Sac",
    "Lily Pad",
    "Magmafish",
    "Prismarine Crystals",
    "Prismarine Shard",
    "Pufferfish",
    "Raw Cod",
    "Raw Salmon",
    "Sponge",
    "Tropical Fish",
  ];

  const getFishingCollectionData = () => {
    if (!leaderboardData) return null;

    switch (selectedFishingCollection) {
      case "clay_ball":
        return leaderboardData
          ? {
              category: "Clay Ball Collection",
              members:
                leaderboardData.leaderboards["Clay_ball Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "ink_sac":
        return leaderboardData
          ? {
              category: "Ink Sac Collection",
              members:
                leaderboardData.leaderboards["Ink_sack Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "lily_pad":
        return leaderboardData
          ? {
              category: "Lily Pad Collection",
              members:
                leaderboardData.leaderboards["Water_lily Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "magmafish":
        return leaderboardData
          ? {
              category: "Magmafish Collection",
              members:
                leaderboardData.leaderboards["Magma_fish Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "prismarine_crystals":
        return leaderboardData
          ? {
              category: "Prismarine Crystals Collection",
              members:
                leaderboardData.leaderboards["Prismarine_crystals Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;

      case "prismarine_shard":
        return leaderboardData
          ? {
              category: "Prismarine Shard Collection",
              members:
                leaderboardData.leaderboards["Prismarine_shard Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "pufferfish":
        return leaderboardData
          ? {
              category: "Pufferfish Collection",
              members:
                leaderboardData.leaderboards["Raw_fish:3 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "raw_cod":
        return leaderboardData
          ? {
              category: "Raw Cod Collection",
              members:
                leaderboardData.leaderboards["Raw_fish Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "raw_salmon":
        return leaderboardData
          ? {
              category: "Raw Salmon Collection",
              members:
                leaderboardData.leaderboards["Raw_fish:1 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "sponge":
        return leaderboardData.leaderboards["Sponge Collection"];
      case "tropical_fish":
        return leaderboardData
          ? {
              category: "Tropical Fish Collection",
              members:
                leaderboardData.leaderboards["Raw_fish:2 Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      default:
        return null;
    }
  };

  return (
    <div className="py-4">
      <TabsContent value="fishing" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          {isLoading ? (
            "Loading fishing leaderboards..."
          ) : (
            <Tabs
              value={selectedFishingCollection}
              onValueChange={setSelectedFishingCollection}
            >
              <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                {fishingItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsTrigger key={value} value={value}>
                      <img
                        src={getFishingIcon(item)}
                        className="w-8 disable-blur"
                        alt={item}
                      />
                      {item}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="mt-8">
                {fishingItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  return (
                    <TabsContent key={value} value={value}>
                      <LeaderboardCard data={getFishingCollectionData()} />
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

export default memo(Fishing);

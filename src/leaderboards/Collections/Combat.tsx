import React, { memo } from "react";

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeaderboardData } from "@/types/leaderboard";

// Blaze Rod, Bone, Chili Pepper, Ender Pearl, Ghast Tear, Gunpowder, Magma Cream, Rotten Flesh, Slimeball, Spider Eye, String

const Combat = ({
  isLoading,
  leaderboardData,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null | null;
}) => {
  const [selectedCombatCollection, setSelectedCombatCollection] =
    React.useState("blaze_rod");

  const getCombatIcon = (item) => {
    switch (item) {
      case "Blaze Rod":
        return "https://wiki.hypixel.net/images/b/ba/Minecraft_items_blaze_rod.png";
      case "Bone":
        return "https://wiki.hypixel.net/images/7/7b/Minecraft_items_bone.png";
      case "Chili Pepper":
        return "https://wiki.hypixel.net/images/4/45/SkyBlock_items_chili_pepper.png";
      case "Ender Pearl":
        return "https://wiki.hypixel.net/images/8/84/Minecraft_items_ender_pearl.png";
      case "Ghast Tear":
        return "https://wiki.hypixel.net/images/b/b0/Minecraft_items_ghast_tear.png";
      case "Gunpowder":
        return "https://wiki.hypixel.net/images/1/11/Minecraft_items_gunpowder.png";
      case "Magma Cream":
        return "https://wiki.hypixel.net/images/7/7e/Minecraft_items_magma_cream.png";
      case "Rotten Flesh":
        return "https://wiki.hypixel.net/images/d/db/Minecraft_items_rotten_flesh.png";
      case "Slimeball":
        return "https://wiki.hypixel.net/images/a/a1/Minecraft_items_slimeball.png";
      case "Spider Eye":
        return "https://wiki.hypixel.net/images/a/ab/Minecraft_items_spider_eye.png";
      case "String":
        return "https://wiki.hypixel.net/images/f/f3/Minecraft_items_string.png";
      default:
        return "";
    }
  };

  const combatItems = [
    "Blaze Rod",
    "Bone",
    "Chili Pepper",
    "Ender Pearl",
    "Ghast Tear",
    "Gunpowder",
    "Magma Cream",
    "Rotten Flesh",
    "Slimeball",
    "Spider Eye",
    "String",
  ];

  const getCombatCollectionData = () => {
    switch (selectedCombatCollection) {
      case "blaze_rod":
        return leaderboardData
          ? {
              category: "Blaze rod Collection",
              members:
                leaderboardData.leaderboards["Blaze_rod Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "bone":
        return leaderboardData
          ? leaderboardData.leaderboards["Bone Collection"]
          : null;
      case "chili_pepper":
        return leaderboardData
          ? {
              category: "Chili pepper Collection",

              members:
                leaderboardData.leaderboards["Chili_pepper Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "ender_pearl":
        return leaderboardData
          ? {
              category: "Ender pearl Collection",
              members:
                leaderboardData.leaderboards["Ender_pearl Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "ghast_tear":
        return leaderboardData
          ? {
              category: "Ghast tear Collection",
              members:
                leaderboardData.leaderboards["Ghast_tear Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "gunpowder":
        return leaderboardData
          ? {
              category: "Gunpowder Collection",
              members:
                leaderboardData.leaderboards["Sulphur Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "magma_cream":
        return leaderboardData
          ? {
              category: "Magma cream Collection",
              members:
                leaderboardData.leaderboards["Magma_cream Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "rotten_flesh":
        return leaderboardData
          ? {
              category: "Rotten flesh Collection",
              members:
                leaderboardData.leaderboards["Rotten_flesh Collection"]
                  ?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "slimeball":
        return leaderboardData
          ? {
              category: "Slimeball Collection",
              members:
                leaderboardData.leaderboards["Slime_ball Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "spider_eye":
        return leaderboardData
          ? {
              category: "Spider eye Collection",
              members:
                leaderboardData.leaderboards["Spider_eye Collection"]?.members,
              lastUpdated: leaderboardData.lastUpdated,
            }
          : null;
      case "string":
        return leaderboardData
          ? leaderboardData.leaderboards["String Collection"]
          : null;

      default:
        return {};
    }
  };

  return (
    <div className="py-4">
      <TabsContent value="combat" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          {isLoading ? (
            "Loading combat leaderboards..."
          ) : (
            <Tabs
              value={selectedCombatCollection}
              onValueChange={setSelectedCombatCollection}
            >
              <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
                {combatItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");
                  const category = item.toUpperCase().replace(/\s/g, "_");

                  return (
                    <TabsTrigger key={value} value={value}>
                      <img
                        src={getCombatIcon(item)}
                        className="w-8 disable-blur"
                        alt={item}
                      />
                      {item}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="mt-8">
                {combatItems.map((item) => {
                  const value = item.toLowerCase().replace(/\s/g, "_");

                  return (
                    <TabsContent key={value} value={value}>
                      <LeaderboardCard data={getCombatCollectionData()} />
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

export default memo(Combat);

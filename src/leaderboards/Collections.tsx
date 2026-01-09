import React from "react";

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Farming from "@/leaderboards/Collections/Farming";
import Mining from "@/leaderboards/Collections/Mining";
import { LeaderboardData } from "@/types/leaderboard";

const Collections = ({
  isLoading,
  leaderboardData,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null | null;
}) => {
  const [selectedCollections, setSelectedCollections] =
    React.useState("farming");

  const [selectedSubCollections, setSelectedSubCollections] =
    React.useState("cactus");

  return (
    <TabsContent value="collections" className="animate-fade-in">
      <div className="text-center py-8 text-muted-foreground">
        <Tabs
          value={selectedCollections}
          onValueChange={setSelectedCollections}
        >
          <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
            <TabsTrigger value="farming">
              <img
                src="https://sky.shiiyu.moe/api/item/WHEAT"
                className="w-8 disable-blur"
              />
              Farming
            </TabsTrigger>
            <TabsTrigger
              value="mining"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://sky.shiiyu.moe/api/item/IRON_PICKAXE"
                className="w-8 disable-blur"
              />
              Mining
            </TabsTrigger>
            <TabsTrigger
              value="combat"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://sky.shiiyu.moe/api/item/IRON_SWORD"
                className="w-8 disable-blur"
              />
              Combat
            </TabsTrigger>
            <TabsTrigger
              value="foraging"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://sky.shiiyu.moe/api/item/IRON_AXE"
                className="w-8 disable-blur"
              />
              Foraging
            </TabsTrigger>
            <TabsTrigger
              value="fishing"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://sky.shiiyu.moe/api/item/FISHING_ROD"
                className="w-8 disable-blur"
              />
              Fishing
            </TabsTrigger>
            <TabsTrigger
              value="bosses"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://wiki.hypixel.net/images/d/d9/Minecraft_items_wither_skeleton_skull.png"
                className="w-8 disable-blur"
              />
              Bosses
            </TabsTrigger>
            <TabsTrigger
              value="rift"
              className="opacity-50 cursor-not-allowed"
              disabled
            >
              <img
                src="https://wiki.hypixel.net/images/8/8d/SkyBlock_items_enchanted_mycelium.gif"
                className="w-8 disable-blur"
              />
              Rift
            </TabsTrigger>
          </TabsList>

          <TabsContent value="farming">
            <Farming leaderboardData={leaderboardData} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="mining">
            <Mining />
          </TabsContent>

          <TabsContent value="combat">
            <div className="py-4">
              Combat Collections Leaderboard Coming Soon!
            </div>
          </TabsContent>

          <TabsContent value="foraging">
            <div className="py-4">
              Foraging Collections Leaderboard Coming Soon!
            </div>
          </TabsContent>

          <TabsContent value="fishing">
            <div className="py-4">
              Fishing Collections Leaderboard Coming Soon!
            </div>
          </TabsContent>

          <TabsContent value="bosses">
            <div className="py-4">
              Bosses Collections Leaderboard Coming Soon!
            </div>
          </TabsContent>

          <TabsContent value="rift">
            <div className="py-4">
              Rift Collections Leaderboard Coming Soon!
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </TabsContent>
  );
};

export default Collections;

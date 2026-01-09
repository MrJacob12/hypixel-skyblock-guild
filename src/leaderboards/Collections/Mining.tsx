import React from "react";

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Coal, Cobblestone, Diamond, Emerald, End Stone, Glacite, Gemstone, Glowstone Dust, Gold Ingot, Gravel, Hard Stone, Ice, Iron Ingot, Lapis Lazuli, Mithril, Mycelium, Nether Quartz, Netherrack, Obsidian, Red Sand, Redstone Dust, Sand, Sulphur, Tungsten, Umber

const Mining = () => {
  const getMiningIcon = (item) => {
    switch (item) {
      case "Coal":
        return "https://wiki.hypixel.net/images/e/ee/Minecraft_items_coal.png";
      case "Cobblestone":
        return "https://wiki.hypixel.net/images/0/0b/Minecraft_items_cobblestone.png";
      case "Diamond":
        return "https://wiki.hypixel.net/images/3/31/Minecraft_items_diamond.png";
      case "Emerald":
        return "https://wiki.hypixel.net/images/e/e9/Minecraft_items_emerald.png";
      case "End Stone":
        return "https://wiki.hypixel.net/images/b/ba/Minecraft_items_end_stone.png";
      case "Glacite":
        return "https://wiki.hypixel.net/images/b/bc/Minecraft_items_packed_ice.png";
      case "Gemstone":
        return "https://wiki.hypixel.net/images/7/7b/SkyBlock_items_gemstone_collection.png";
      case "Glowstone Dust":
        return "https://wiki.hypixel.net/images/f/fb/Minecraft_items_glowstone_dust.png";
      case "Gold":
        return "https://wiki.hypixel.net/images/4/4f/Minecraft_items_gold_ingot.png";
      case "Gravel":
        return "https://wiki.hypixel.net/images/8/89/Minecraft_items_gravel.png";
      case "Hard Stone":
        return "https://wiki.hypixel.net/images/4/49/Minecraft_items_stone.png";
      case "Ice":
        return "https://wiki.hypixel.net/images/b/be/Minecraft_items_ice.png";
      case "Iron":
        return "https://wiki.hypixel.net/images/4/46/Minecraft_items_iron_ingot.png";
      case "Lapis Lazuli":
        return "https://wiki.hypixel.net/images/c/cd/Minecraft_items_lapis_lazuli.png";
      case "Mithril":
        return "https://wiki.hypixel.net/images/0/06/Minecraft_items_prismarine_crystals.png";
      case "Mycelium":
        return "https://wiki.hypixel.net/images/9/94/Minecraft_items_mycelium.png";
      case "Nether Quartz":
        return "https://wiki.hypixel.net/images/1/1d/Minecraft_items_nether_quartz.png";
      case "Netherrack":
        return "https://wiki.hypixel.net/images/e/e8/Minecraft_items_netherrack.png";
      case "Obsidian":
        return "https://wiki.hypixel.net/images/1/1d/Minecraft_items_obsidian.png";
      case "Red Sand":
        return "https://wiki.hypixel.net/images/b/ba/Minecraft_items_red_sand.png";
      case "Redstone Dust":
        return "https://wiki.hypixel.net/images/8/87/Minecraft_items_redstone_dust.png";
      case "Sand":
        return "https://wiki.hypixel.net/images/c/c8/Minecraft_items_sand.png";
      case "Sulphur":
        return "https://wiki.hypixel.net/images/f/fb/Minecraft_items_glowstone_dust.png";
      case "Tungsten":
        return "https://wiki.hypixel.net/images/6/6a/SkyBlock_items_tungsten.png";
      case "Umber":
        return "https://wiki.hypixel.net/images/a/a8/SkyBlock_items_umber.png";
      default:
        return "";
    }
  };

  const miningItems = [
    "Coal",
    "Cobblestone",
    "Diamond",
    "Emerald",
    "End Stone",
    "Glacite",
    "Gemstone",
    "Glowstone Dust",
    "Gold",
    "Gravel",
    "Hard Stone",
    "Ice",
    "Iron",
    "Lapis Lazuli",
    "Mithril",
    "Mycelium",
    "Nether Quartz",
    "Netherrack",
    "Obsidian",
    "Red Sand",
    "Redstone Dust",
    "Sand",
    "Sulphur",
    "Tungsten",
    "Umber",
  ];

  return (
    <div className="py-4">
      <TabsContent value="mining" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          <Tabs defaultValue="Coal">
            <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
              {miningItems.map((item) => {
                const value = item.toLowerCase().replace(/\s/g, "_");
                const category = item.toUpperCase().replace(/\s/g, "_");

                return (
                  <TabsTrigger key={value} value={value}>
                    <img
                      src={getMiningIcon(item)}
                      className="w-8 disable-blur"
                      alt={item}
                    />
                    {item}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <div className="mt-8">
              {miningItems.map((item) => {
                const value = item.toLowerCase().replace(/\s/g, "_");
                const category = item.toUpperCase().replace(/\s/g, "_");

                return (
                  <TabsContent key={value} value={value}>
                    <h3 className="text-2xl font-bold mb-4">
                      {item} Leaderboard
                    </h3>
                    <span>Leaderboard Coming Soon!</span>
                  </TabsContent>
                );
              })}
            </div>
          </Tabs>
        </div>
      </TabsContent>
    </div>
  );
};

export default Mining;

import React from "react";

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// Cactus, Carrot, Cocoa Beans, Feather, Leather, Melon, Mushroom, Mutton, Nether Wart, Potato, Pumpkin, Chicken, Porkchop, Rabbit, Seeds, Sugar Cane, Wheat

const Farming = () => {
  const getFarmingCollectionName = (key: string) => {};

  return (
    <div className="py-4">
      <TabsContent value="farming" className="animate-fade-in">
        <div className="text-center py-8 text-muted-foreground">
          <Tabs>
            <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
              <TabsTrigger value="cactus">
                <img
                  src="https://wiki.hypixel.net/images/6/60/Minecraft_items_cactus.png"
                  className="w-8 disable-blur"
                />
                Cactus
              </TabsTrigger>
              <TabsTrigger value="carrot">
                <img
                  src="https://wiki.hypixel.net/images/7/7b/Minecraft_items_carrot.png"
                  className="w-8 disable-blur"
                />
                Carrot
              </TabsTrigger>
              <TabsTrigger value="cocoa_beans">
                <img
                  src="https://wiki.hypixel.net/images/5/58/Minecraft_items_cocoa_beans.png"
                  className="w-8 disable-blur"
                />
                Cocoa Beans
              </TabsTrigger>
              <TabsTrigger value="feather">
                <img
                  src="https://wiki.hypixel.net/images/1/1b/Minecraft_items_feather.png"
                  className="w-8 disable-blur"
                />
                Feather
              </TabsTrigger>
              <TabsTrigger value="leather">
                <img
                  src="https://wiki.hypixel.net/images/0/01/Minecraft_items_leather.png"
                  className="w-8 disable-blur"
                />
                Leather
              </TabsTrigger>
              <TabsTrigger value="melon">
                <img
                  src="https://wiki.hypixel.net/images/c/c0/Minecraft_items_melon_slice.png"
                  className="w-8 disable-blur"
                />
                Melon
              </TabsTrigger>
              <TabsTrigger value="mushroom">
                <img
                  src="https://wiki.hypixel.net/images/2/2a/Minecraft_items_red_mushroom.png"
                  className="w-8 disable-blur"
                />
                Mushroom
              </TabsTrigger>
              <TabsTrigger value="mutton">
                <img
                  src="https://wiki.hypixel.net/images/d/d3/Minecraft_items_raw_mutton.png"
                  className="w-8 disable-blur"
                />
                Mutton
              </TabsTrigger>
              <TabsTrigger value="nether_wart">
                <img
                  src="https://wiki.hypixel.net/images/f/f3/Minecraft_items_nether_wart.png"
                  className="w-8 disable-blur"
                />
                Nether Wart
              </TabsTrigger>
              <TabsTrigger value="potato">
                <img
                  src="https://wiki.hypixel.net/images/d/d1/Minecraft_items_potato.png"
                  className="w-8 disable-blur"
                />
                Potato
              </TabsTrigger>
              <TabsTrigger value="pumpkin">
                <img
                  src="https://wiki.hypixel.net/images/f/f4/Minecraft_items_carved_pumpkin.png"
                  className="w-8 disable-blur"
                />
                Pumpkin
              </TabsTrigger>
              <TabsTrigger value="chicken">
                <img
                  src="https://wiki.hypixel.net/images/a/ab/Minecraft_items_raw_chicken.png"
                  className="w-8 disable-blur"
                />
                Chicken
              </TabsTrigger>
              <TabsTrigger value="porkchop">
                <img
                  src="https://wiki.hypixel.net/images/1/1a/Minecraft_items_raw_porkchop.png"
                  className="w-8 disable-blur"
                />
                Porkchop
              </TabsTrigger>
              <TabsTrigger value="rabbit">
                <img
                  src="https://wiki.hypixel.net/images/e/e1/Minecraft_items_raw_rabbit.png"
                  className="w-8 disable-blur"
                />
                Rabbit
              </TabsTrigger>
              <TabsTrigger value="seeds">
                <img
                  src="https://wiki.hypixel.net/images/9/9b/Minecraft_items_wheat_seeds.png"
                  className="w-8 disable-blur"
                />
                Seeds
              </TabsTrigger>
              <TabsTrigger value="sugar_cane">
                <img
                  src="https://wiki.hypixel.net/images/f/fb/Minecraft_items_sugar_cane.png"
                  className="w-8 disable-blur"
                />
                Sugar Cane
              </TabsTrigger>
              <TabsTrigger value="wheat">
                <img
                  src="https://wiki.hypixel.net/images/4/4e/Minecraft_items_wheat.png"
                  className="w-8 disable-blur"
                />
                Wheat
              </TabsTrigger>
              <TabsTrigger value="sunflower">
                <img
                  src="https://wiki.hypixel.net/images/2/2e/Minecraft_items_sunflower.png"
                  className="w-8 disable-blur"
                />
                Sunflower
              </TabsTrigger>

              <TabsTrigger value="wild_rose">
                <img
                  src="https://static.wikia.nocookie.net/hypixel-skyblock/images/0/02/Rose_Bush.png"
                  className="w-8 disable-blur"
                />
                Wild Rose
              </TabsTrigger>

              <TabsTrigger value="moonflower">
                <img
                  src="https://static.wikia.nocookie.net/hypixel-skyblock/images/6/6b/Blue_Orchid.png"
                  className="w-8 disable-blur"
                />
                Moonflower
              </TabsTrigger>
            </TabsList>
            <span>Leaderboard Coming Soon!</span>
          </Tabs>
        </div>
      </TabsContent>
    </div>
  );
};

export default Farming;

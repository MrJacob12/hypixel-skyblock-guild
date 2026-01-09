import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Slayer = ({
  isLoading,
  selectedSlayer,
  setSelectedSlayer,
  slayerZombieData,
  slayerSpiderData,
  slayerWolfData,
  slayerEndermanData,
  slayerVampireData,
  slayerBlazeData,
}) => {
  const getSleyerData = () => {
    switch (selectedSlayer) {
      case "zombie":
        return slayerZombieData;
      case "spider":
        return slayerSpiderData;
      case "wolf":
        return slayerWolfData;
      case "enderman":
        return slayerEndermanData;
      case "vampire":
        return slayerVampireData;
      case "blaze":
        return slayerBlazeData;
      default:
        return null;
    }
  };

  return (
    <TabsContent value="slayers" className="animate-fade-in">
      <div className="text-center py-8 text-muted-foreground">
        <Tabs value={selectedSlayer} onValueChange={setSelectedSlayer}>
          <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
            <TabsTrigger value="zombie">
              <img
                src="https://sky.shiiyu.moe/api/head/1fc0184473fe882d2895ce7cbc8197bd40ff70bf10d3745de97b6c2a9c5fc78f"
                className="w-8"
              />
              Zombie
            </TabsTrigger>
            <TabsTrigger value="spider">
              <img
                src="https://sky.shiiyu.moe/api/head/9d7e3b19ac4f3dee9c5677c135333b9d35a7f568b63d1ef4ada4b068b5a25"
                className="w-8"
              />
              Spider
            </TabsTrigger>
            <TabsTrigger value="wolf">
              <img
                src="https://sky.shiiyu.moe/api/head/f83a2aa9d3734b919ac24c9659e5e0f86ecafbf64d4788cfa433bbec189e8"
                className="w-8"
              />
              Wolf
            </TabsTrigger>
            <TabsTrigger value="enderman">
              <img
                src="https://sky.shiiyu.moe/api/head/1b09a3752510e914b0bdc9096b392bb359f7a8e8a9566a02e7f66faff8d6f89e"
                className="w-8"
              />
              Enderman
            </TabsTrigger>
            <TabsTrigger value="vampire">
              <img
                src="https://sky.shiiyu.moe/api/head/5aa29ea961757dc3c90bfabf302c5abe9d308fb4a7d3864e5788ad2cc9160aa2"
                className="w-8"
              />
              Vampire
            </TabsTrigger>
            <TabsTrigger value="blaze">
              <img
                src="https://sky.shiiyu.moe/api/head/b20657e24b56e1b2f8fc219da1de788c0c24f36388b1a409d0cd2d8dba44aa3b"
                className="w-8"
              />
              Blaze
            </TabsTrigger>
          </TabsList>
          <div className="text-center py-8 text-muted-foreground">
            {["zombie", "spider", "wolf", "enderman", "vampire", "blaze"].map(
              (type) => (
                <TabsContent key={type} value={type}>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
                      data...
                    </div>
                  ) : getSleyerData() ? (
                    <LeaderboardCard data={getSleyerData()} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No {type.charAt(0).toUpperCase() + type.slice(1)} data
                      available
                    </div>
                  )}
                </TabsContent>
              )
            )}
          </div>
        </Tabs>
      </div>
    </TabsContent>
  );
};

export default Slayer;

import LeaderboardCard from "@/components/LeaderboardCard";

import { TabsContent } from "@/components/ui/tabs";

const SkyblockLevel = ({ isLoading, levelData }) => {
  return (
    <TabsContent value="skyblock-level" className="animate-fade-in">
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading data...
        </div>
      ) : levelData ? (
        <LeaderboardCard data={levelData} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No data available
        </div>
      )}
    </TabsContent>
  );
};

export default SkyblockLevel;
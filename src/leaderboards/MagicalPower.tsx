import LeaderboardCard from "@/components/LeaderboardCard";

import { TabsContent } from "@/components/ui/tabs";

const MagicalPower = ({
    isLoading,
    magicalPowerData,
}) => {
  return (
    <TabsContent value="magical-power" className="animate-fade-in">
      <div className="text-center py-8 text-muted-foreground">
        {isLoading ? (
          <div className="text-center py-8 text-muted-foreground">
            Loading Magical Power data...
          </div>
        ) : magicalPowerData ? (
          <LeaderboardCard data={magicalPowerData} />
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No Magical Power data available
          </div>
        )}
      </div>
    </TabsContent>
  );
};

export default MagicalPower;

import LeaderboardCard from "@/components/LeaderboardCard";

import { TabsContent } from "@/components/ui/tabs";

const NucleusRuns = ({ isLoading, nucleusRunsData }) => {
  return (
    <TabsContent value="nucleus-runs" className="animate-fade-in">
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">
          Loading data...
        </div>
      ) : nucleusRunsData ? (
        <LeaderboardCard data={nucleusRunsData} />
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No data available
        </div>
      )}
    </TabsContent>
  );
};

export default NucleusRuns;

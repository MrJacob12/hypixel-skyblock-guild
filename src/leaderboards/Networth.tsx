import React, { useState } from "react";

import LeaderboardCard from "@/components/LeaderboardCard";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const Networth = ({
  isLoading,
  data,
}: {
  isLoading: boolean;
  leaderboardData: Record<string, LeaderboardData> | null | null;
}) => {
  const [selectedNetworth, setSelectedNetworth] = useState("networth");

  const getNetworthData = () => {
    switch (selectedNetworth) {
      case "networth":
        return data["Networth"];
      case "mostExpensiveItem":
        return data["Most Expensive Item"];
      default:
          return {};
    };
  }

  return (
    <TabsContent value="networth" className="animate-fade-in">
      <div className="text-center py-8 text-muted-foreground">
        <Tabs value={selectedNetworth} onValueChange={setSelectedNetworth}>
          <TabsList className="mb-6 bg-accent/50 flex-wrap h-auto">
            <TabsTrigger value="networth">
              <span className="text-foreground text-amber-500">℻</span>
              Net Worth
            </TabsTrigger>
            <TabsTrigger value="mostExpensiveItem">
              <img
                src="https://sky.shiiyu.moe/api/head/bbe6d66770a61bf56e6d4b476922b1c3b3dc9f78a26e56b36cd965b7ab20b417"
                className="w-8 disable-blur"
              />
              Most Expensive Item
            </TabsTrigger>
            
          </TabsList>
          <div className="text-center py-8 text-muted-foreground">
            <TabsContent value={selectedNetworth}>
              {["networth", "mostExpensiveItem"].map((role) => (
                <TabsContent key={role} value={role}>
                  {isLoading ? (
                    <div className="text-center py-8 text-muted-foreground">
                      Loading {role.charAt(0).toUpperCase() + role.slice(1)}{" "}
                      data...
                    </div>
                  ) : getNetworthData() ? (
                    <LeaderboardCard data={getNetworthData()} />
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      No {role.charAt(0).toUpperCase() + role.slice(1)} data
                      available
                    </div>
                  )}
                </TabsContent>
              ))}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </TabsContent>
  );
};
export default Networth;

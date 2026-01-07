import LeaderboardCard from "@/components/LeaderboardCard";
import { skyblockLevelData, networthData } from "@/data/placeholderData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-secondary/20 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Guild Leaderboards
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hypixel Skyblock
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="skyblock-level" className="w-full">
          <TabsList className="mb-6 bg-secondary/50">
            <TabsTrigger value="skyblock-level">Skyblock Level</TabsTrigger>
            <TabsTrigger value="networth">Networth</TabsTrigger>
          </TabsList>
          <TabsContent value="skyblock-level" className="animate-fade-in">
            <LeaderboardCard data={skyblockLevelData} />
          </TabsContent>
          <TabsContent value="networth" className="animate-fade-in">
            <LeaderboardCard data={networthData} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container mx-auto px-4 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Dane pochodzą z Hypixel API
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

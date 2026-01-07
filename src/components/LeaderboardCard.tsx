import { LeaderboardData } from "@/types/leaderboard";
import LeaderboardEntry from "./LeaderboardEntry";

interface LeaderboardCardProps {
  data: LeaderboardData;
}

const LeaderboardCard = ({ data }: LeaderboardCardProps) => {
  return (
    <div className="bg-secondary/30 rounded-xl p-6 border border-border/50 backdrop-blur-sm animate-scale-in">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{data.category}</h2>
        <span className="text-xs text-muted-foreground">
          Aktualizacja: {data.lastUpdated}
        </span>
      </div>

      <div className="space-y-1">
        {data.members.map((member, index) => (
          <LeaderboardEntry key={member.uuid} member={member} index={index} />
        ))}
      </div>
    </div>
  );
};

export default LeaderboardCard;

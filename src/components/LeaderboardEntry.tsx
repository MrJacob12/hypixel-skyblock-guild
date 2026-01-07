import { GuildMember } from "@/types/leaderboard";
import { cn } from "@/lib/utils";

interface LeaderboardEntryProps {
  member: GuildMember;
  index: number;
}

const LeaderboardEntry = ({ member, index }: LeaderboardEntryProps) => {
  const isTop3 = member.rank <= 3;
  
  const getRankStyles = () => {
    switch (member.rank) {
      case 1:
        return {
          scale: "scale-105",
          border: "gold-border",
          rankColor: "text-gold rank-glow-gold",
          bg: "bg-gradient-to-r from-card via-card to-yellow-950/20",
        };
      case 2:
        return {
          scale: "scale-[1.02]",
          border: "silver-border",
          rankColor: "text-silver rank-glow-silver",
          bg: "bg-gradient-to-r from-card via-card to-slate-700/10",
        };
      case 3:
        return {
          scale: "scale-[1.01]",
          border: "bronze-border",
          rankColor: "text-bronze rank-glow-bronze",
          bg: "bg-gradient-to-r from-card via-card to-orange-950/10",
        };
      default:
        return {
          scale: "",
          border: "",
          rankColor: "text-muted-foreground",
          bg: "bg-card",
        };
    }
  };

  const styles = getRankStyles();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 hover:bg-accent/50",
        styles.scale,
        styles.border,
        styles.bg,
        isTop3 && "my-2"
      )}
      style={{
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "font-bold w-8 text-center",
            isTop3 ? "text-xl" : "text-sm",
            styles.rankColor
          )}
        >
          #{member.rank}
        </span>
        
        <img
          src={`https://mc-heads.net/avatar/${member.uuid}/32`}
          alt={member.username}
          className={cn(
            "rounded-md",
            member.rank === 1 ? "w-10 h-10" : member.rank <= 3 ? "w-8 h-8" : "w-7 h-7"
          )}
        />
        
        <span
          className={cn(
            "font-medium",
            member.rank === 1 ? "text-lg" : member.rank <= 3 ? "text-base" : "text-sm"
          )}
        >
          {member.username}
        </span>
      </div>

      <span
        className={cn(
          "font-semibold tabular-nums",
          member.rank === 1 ? "text-lg" : member.rank <= 3 ? "text-base" : "text-sm",
          styles.rankColor
        )}
      >
        {member.formattedValue}
      </span>
    </div>
  );
};

export default LeaderboardEntry;

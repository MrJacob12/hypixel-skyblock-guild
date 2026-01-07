export interface GuildMember {
  rank: number;
  username: string;
  uuid: string;
  value: number;
  formattedValue: string;
}

export interface LeaderboardData {
  category: string;
  lastUpdated: string;
  members: GuildMember[];
}

export type LeaderboardCategory = 'skyblock-level' | 'networth';

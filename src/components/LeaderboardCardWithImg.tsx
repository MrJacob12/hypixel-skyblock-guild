import { LeaderboardData } from "@/types/leaderboard";
import LeaderboardEntry from "./LeaderboardEntry";
interface LeaderboardCardProps {
  data: LeaderboardData;
}
const LeaderboardCardWithImg = ({ data }: LeaderboardCardProps) => {
  data.members.map((item) => {
    if (item.formattedValue.includes("Golden Dragon")) {
      item.icon =
        "https://sky.shiiyu.moe/api/head/2e9f9b1fc014166cb46a093e5349b2bf6edd201b680d62e48dbf3af9b0459116";
    } else if (item.formattedValue.includes("DR-X655")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/titanium_drill_dr_x655.png";
    } else if (item.formattedValue.includes("Plasmaflux")) {
      item.icon =
        "https://sky.shiiyu.moe/api/head/83ed4ce23933e66e04df16070644f7599eeb55307f7eafe8d92f40fb3520863c";
    } else if (item.formattedValue.includes("DR-X555")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/titanium_drill_dr_x555.png";
    } else if (item.formattedValue.includes("Helianthus Helmet")) {
      item.icon =
        "https://sky.shiiyu.moe/api/head/46e48a6eff318dcda57d5d76a9b2656be25973e3d472b6d2e446a8e60f60a78a";
    } else if (item.formattedValue.includes("DR-X455")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/titanium_drill_dr_x455.png";
    } else if (item.formattedValue.includes("Nether Wart Hoe")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/newton_nether_warts_hoe_tier_3.png";
    } else if (item.formattedValue.includes("DR-X355")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/titanium_drill_dr_x355.png";
    } else if (item.formattedValue.includes("Bee")) {
      item.icon =
        "https://sky.shiiyu.moe/api/head/7e941987e825a24ea7baafab9819344b6c247c75c54a691987cd296bc163c263";
    } else if (item.formattedValue.includes("SX-R326")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/mithril_drill_sx_326.png";
    } else if (item.formattedValue.includes("Euclid's Wheat Hoe")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/euclid_wheat_hoe_tier_2.png";
    } else if (item.formattedValue.includes("Mithril Golem")) {
      item.icon =
        "https://sky.shiiyu.moe/api/head/c1b2dfe8ed5dffc5b1687bc1c249c39de2d8a6c3d90305c95f6d1a1a330a0b1";
    } else if (item.formattedValue.includes("Divan's Drill")) {
      item.icon =
        "https://sky.shiiyu.moe/assets/resourcepacks/FurfSky/assets/cittofirmgenerated/textures/item/divan_drill.png";
    }
  });

  return (
    <div className="bg-secondary/30 rounded-xl p-4 border border-border/50 backdrop-blur-sm animate-scale-in">
      <div className="flex items-baseline justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{data.category}</h2>
        <span className="text-xs text-muted-foreground">
          Last update: {data.lastUpdated}
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
export default LeaderboardCardWithImg;

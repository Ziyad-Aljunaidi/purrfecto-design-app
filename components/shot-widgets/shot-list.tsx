// components/ShotList.tsx
import { DesignCard } from "@/components/shot-widgets/card-design";
import { getLatestShots, getProjectMetrics, getShotCreator } from "@/app/actions/GetProjectShotsAction";
import { isShotLiked, isShotSaved } from "@/app/actions/ProjectShotMetricsAction";

export async function ShotList({ userId }: { userId: string |null }) {
  const shots = await getLatestShots();

  return (
    <>
      {shots.map(async (shot) => {
        const { totalLikes, totalViews } = await getProjectMetrics(shot.id);
        const creator = await getShotCreator(shot.creator_id);

        return (
          <DesignCard
            key={shot.id}
            userId={userId}
            shot={shot}
            creator={creator}
            likes={totalLikes}
            views={totalViews}
            is_liked={await isShotLiked({ shotId: shot.id, userId })}
            is_saved={await isShotSaved({ shotId: shot.id, userId })}
          />
        );
      })}
    </>
  );
}
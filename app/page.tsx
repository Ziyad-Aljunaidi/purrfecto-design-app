
import { getLatestShots, getProjectMetrics, getShotCreator } from "@/app/actions/GetProjectShotsAction";
import { isShotLiked, isShotSaved } from "@/app/actions/ProjectShotMetricsAction";
import { getUserId } from "@/app/actions/UserAction";

import { DesignCard } from "@/components/shot-widgets/card-design";

export default async  function Home() {
  const userId = await getUserId();

  const shots = await getLatestShots();
  return (
    <main className="@container/main px-4 pt-4">
      <div className="h-96 max-w-[1920px] w-auto mx-auto rounded-xl bg-background ring-1 ring-accent my-2"></div>
      <div className="grid grid-cols-1 gap-4 space-y-4 w-full max-w-[1920px] md:grid-cols-3 lg:grid-cols-4 my-6 mx-auto">
        {await Promise.all(
          shots.map(async (shot) => {
            const { totalLikes, totalViews} = await getProjectMetrics(shot.id);
            const creator = await getShotCreator(shot.creator_id);

            return (
              <DesignCard
                key={shot.id}
                userId={userId}
                shot={shot}
                creator={creator}

                likes={totalLikes}
                views={totalViews}
                is_liked={await isShotLiked({shotId: shot.id, userId: userId})}
                is_saved={await isShotSaved({shotId: shot.id, userId: userId})}
                
              />
            );
          })
        )}
      </div>
    </main>
  );
}

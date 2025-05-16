import {
  getShotCreator,
  getShot,
  getProjectMetrics,
} from "@/app/actions/GetProjectShotsAction";
import ShotPageComp from "@/components/shot-widgets/shot-page-comp";
import { notFound } from "next/navigation";
import { getUserId } from "@/app/actions/UserAction";
import { isShotLiked, isShotSaved } from "@/app/actions/ProjectShotMetricsAction";

export default async function ShotCreator({
  params,
}: {
  params: Promise<{ shotId: string }>;
}) {
  const { shotId } = await params; // ✅ no await here

  const shot = await getShot(shotId);
  if (!shot) {
    notFound();
  }

  const creator = await getShotCreator(shot.creator_id);
  const shotMetrics = await getProjectMetrics(shotId);
  const userId = await getUserId();
  const likes = shotMetrics.totalLikes;
  

  // const views = shotMetrics.totalViews;
  // const comments = shotMetrics.totalComments;
  

  return (
    <ShotPageComp
      creator={creator}
      shot={shot}
      likes={likes}
      // views={0}
      is_liked={await isShotLiked({shotId: shot.id, userId: userId})}
      is_saved={await isShotSaved({shotId: shot.id, userId: userId})}
      userId={userId}
    />
  );
}

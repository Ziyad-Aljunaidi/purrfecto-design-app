import { getShotCreator, getShot, getShotAttachment, getProjectMetrics } from "@/actions/GetProjectShotsAction";
import ShotPageComp from "@/components/shot-widgets/shot-page-comp";
import { notFound } from "next/navigation";


export default async function ShotCreator({params}: {params: {shotId: string}}) {
  const { shotId } = await params;
  const shot = await getShot(shotId);
  if (!shot) {
    notFound();
  }
  const creator = await getShotCreator(shot.creator_id);
  const shotAttachments = await getShotAttachment(shot.attachment_id);
  const shotMetrics = await getProjectMetrics(shotId);
  const likes = shotMetrics.totalLikes;
  const views = shotMetrics.totalViews;
  const comments = shotMetrics.totalComments;
  return (
    <ShotPageComp creator={creator} shot={shot} shotAttachments={shotAttachments[0]} likes={likes} views={views} comments={comments} />
  );

  
}
import { isFollowing, getFollowStats } from "@/app/actions/FollowUserAction";
import { getUserPublicDataById, getUserId } from "@/app/actions/UserAction";

import { Profile } from "@/components/public-profile-comp-v2";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>;
}) {
  const { profileId } = await params;
  const response = await getUserPublicDataById(profileId);
  const userId = await getUserId();
  if (userId === response.data?.userId) {
    console.log("SAME USER");
  }
  // console.log(response);

  const isAlreadyFollowing = await isFollowing(profileId);
  // const followers = await getFollowers(profileId);
  // const followings = await getFollowings(profileId);
  const followStats = await getFollowStats(profileId);
  // console.log(isAlreadyFollowing);)

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto md:px-4">
      {/* <h1 className="text-2xl font-bold">Profile ID: {profileId}</h1> */}
      {/* Add your profile content here */}
      {response.data && (
        <Profile
          profile={response.data}
          myProfile={userId === response.data?.userId}
          isFollowing={isAlreadyFollowing.follow}
          followers={followStats.followers}
          followings={followStats.followings}
        />
      )}
    </div>
  );
}

import { getUserPublicDataById } from "@/app/actions/UserAction";
import { Profile } from "@/components/public-profile-comp";


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const { profileId } = await params;
  const response = await getUserPublicDataById(profileId);
  // console.log(response);


  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto md:px-4">
      {/* <h1 className="text-2xl font-bold">Profile ID: {profileId}</h1> */}
      {/* Add your profile content here */}
      {response.data && <Profile profile={response.data} />}
    </div>
  );

}
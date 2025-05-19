import { ExampleProfile } from "@/components/public-profile-comp";


export default async function ProfilePage({
  params,
}: {
  params: Promise<{ profileId: string }>
}) {
  const { profileId } = await params;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[1920px] mx-auto">
      <h1 className="text-2xl font-bold">Profile ID: {profileId}</h1>
      {/* Add your profile content here */}
      <ExampleProfile />
    </div>
  );

}
import CreateShotWrapper from "@/components/create-shot-form/create-shot-wrapper";

export default function CreatePage() {
  return (
    <main className="w-full lg:w-2/3 mx-auto my-8 px-4 font-[family-name:var(--font-inter)]">
      {/* <h1 className="font-[family-name:var(--font-geist-mono)] font-bold text-4xl">Create a project</h1> */}
      {/* <CreateProjectForm /> */}
      <CreateShotWrapper />
    </main>
  );
    
}
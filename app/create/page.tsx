import CreateProjectForm from "@/components/create-project-form";


export default function CreatePage() {
  return (
    <main className="w-full lg:w-2/3 mx-auto my-8 px-4">
      {/* <h1 className="font-[family-name:var(--font-geist-mono)] font-bold text-4xl">Create a project</h1> */}
      <CreateProjectForm />
    </main>
  );
}
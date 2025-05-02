// import CardContainer from "@/components/card-widgets/card-container";
// import Image from "next/image";
import { DesignCard } from "@/components/card-widgets/card-design";
// import { DesignCardDemo } from "@/components/card-widgets/card-demo";
import { getLatestShots } from "@/actions/GetProjectShotsAction";



export default async  function Home() {
  const shots = await getLatestShots();
  // console.log(shots[0]);
  return (
    <main className="@container/main px-4 pt-4">
      <div className="h-40   max-w-[1920px] w-auto m-auto rounded-xl bg-accent"></div>
      <div className="grid grid-cols-1 gap-10 max-w-[1920px] w-auto m-auto  md:grid-cols-3 lg:grid-cols-4">
        {shots.map((shot) => (
          <DesignCard key={shot.id} imageUrl={shot.thumbnail_url} title={shot.title}  />
        ))}
      </div>
    </main>
  );
}

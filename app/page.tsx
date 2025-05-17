// app/page.tsx
import { getUserId } from "@/app/actions/UserAction";
import { Suspense } from "react";
import { CardsSkeletonLoader } from "@/components/skeletons/cards-skeleton-loader";
import { ShotList } from "@/components/shot-widgets/shot-list";

export default async function Home() {
  const userId = await getUserId();

  return (
    <main className="@container/main px-4 pt-4">
      <div className="h-96 max-w-[1920px] w-auto mx-auto rounded-xl bg-background ring-1 ring-accent my-2"></div>
      <div className="grid grid-cols-1 gap-4 space-y-4 w-full max-w-[1920px] md:grid-cols-3 lg:grid-cols-4 my-6 mx-auto">
        <Suspense fallback={<CardsSkeletonLoader numberOfCards={20} />}>
          <ShotList userId={userId} />
        </Suspense>
      </div>
    </main>
  );
}
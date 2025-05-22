// app/page.tsx
import { getUserId } from "@/app/actions/UserAction";
import NewsletterLandingPage from "@/components/newsletter/newsletter-landing-page";
import { Suspense } from "react";
import { CardsSkeletonLoader } from "@/components/skeletons/cards-skeleton-loader";
import { ShotList } from "@/components/shot-widgets/shot-list";

export default async function Home() {
  const userId = await getUserId();

  return (
    <main className="@container/main px-4 pt-4 flex flex-col gap-4">
            <NewsletterLandingPage
        // className="aspect-[2/1] md:aspect-[3/1]"
      />
      <div className="grid grid-cols-1 gap-4 space-y-4 w-full max-w-[1920px] md:grid-cols-3 lg:grid-cols-4 my-6 mx-auto">
        <Suspense fallback={<CardsSkeletonLoader numberOfCards={20} />}>
          <ShotList userId={userId} />
        </Suspense>
      </div>
    </main>
    // <main>

    // </main>
  );
}

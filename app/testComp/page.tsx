import { CardsSkeletonLoader } from "@/components/skeletons/cards-skeleton-loader";
export default function TestComp() {
  return (
    <div className="grid grid-cols-1 gap-4 space-y-4 w-full max-w-[1920px] md:grid-cols-3 lg:grid-cols-4 my-6 mx-auto">
      <CardsSkeletonLoader numberOfCards={20} />
    </div>
    
  );
}
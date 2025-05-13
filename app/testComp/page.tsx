// import LikeButton from "@/components/metrics-buttons/like-button";
import { LikeButtonWrapper } from "@/components/metrics-buttons/like-button-wrapper";


export default function TestComp() {
  return (
    <div>
      <h1>Test Component</h1>
      {/* <ShotCardLikeButton shotId="ZuEulkwvzJaAeMn_iHKlI" creatorId="X1y4qEkG9svuX8pFYxCr0jifmjVQm2NM" type="card" />
      <ShotCardLikeButton shotId="ZuEulkwvzJaAeMn_iHKlI" creatorId="X1y4qEkG9svuX8pFYxCr0jifmjVQm2NM" type="drawer" /> */}
      <LikeButtonWrapper shotId="ZuEulkwvzJaAeMn_iHKlI" creatorId="X1y4qEkG9svuX8pFYxCr0jifmjVQm2NM" type="page" />
      <LikeButtonWrapper shotId="ZuEulkwvzJaAeMn_iHKlI" creatorId="X1y4qEkG9svuX8pFYxCr0jifmjVQm2NM" type="card" />
    </div>
  );
}
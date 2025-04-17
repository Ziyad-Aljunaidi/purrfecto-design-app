import { seedShots } from "@/db/seed";

export async function GET() {
  // try{
  //   await seedShots();
  //   return new Response("Seeded shots successfully", { status: 200 });
  // }catch (error) {  
  //   console.error("Error seeding shots: ", error);
  //   return new Response("Error seeding shots", { status: 500 });
  // }
  return new Response("Nice try Chump!", { status: 409 });
}
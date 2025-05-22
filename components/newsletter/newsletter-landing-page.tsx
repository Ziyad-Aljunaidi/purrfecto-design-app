import { cn } from "@/lib/utils";
import { outfit } from "../fonts";
import NewsletterSignUpForm from "./newsletter-signup-form";
import { tags as allTags } from "@/lib/tags";
interface ContentBoxProps {
  className?: string;
}

export default function NewsletterLandingPage({ className }: ContentBoxProps) {
  // async function test(){
  //   const response = await insertNewsletterEmail("zadj9965@gmail.com")
  //   console.log(response)
  // }
  // test()
  return (
    <div
      className={cn(
        "w-full max-w-[1920px] mx-auto flex flex-col gap-4 sm:gap-6 lg:gap-8 my-4 sm:my-6 lg:my-8  rounded-2xl sm:rounded-3xl lg:rounded-4xl",
        outfit.className,
        className
      )}
    >
      <div className="w-full flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl">
          Craft in the silence between worlds. Inspire. Evolve.
        </h1>
        <h3 className="text-lg sm:text-xl font-bold mt-3 lg:mt-4">
          Summon Your Work to the Gilded Spire
        </h3>
        {/* <p className="mt-2 text-sm sm:text-base max-w-xl text-muted-foreground">
      Join the early wave of visionary creators.
      <br className="hidden sm:block" />
      Be the first to step into a new realm of inspiration,
      <br className="hidden md:block" />
      recognition, and creative power.
    </p> */}

        {/* Newsletter form and note */}
        <div className="mt-2 sm:mt-4 w-full max-w-xl px-2 sm:px-4">
          <NewsletterSignUpForm />
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground italic">
            Don&apos;t worry, we&apos;re too broke to send spam emails.
          </p>
        </div>

        {/* Tags under newsletter */}
        <div className="mt-6 sm:mt-8 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-4xl">
          {allTags.map((tag, index) => (
            <div
              key={index}
              className="cursor-pointer text-sm sm:text-base lg:text-lg font-bold px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 bg-accent/50 hover:ring-2 active:ring-2 active:ring-lime-400 active:bg-lime-400/10 hover:ring-lime-400 rounded-md lg:rounded-lg hover:bg-lime-400/10 transition-all duration-100"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

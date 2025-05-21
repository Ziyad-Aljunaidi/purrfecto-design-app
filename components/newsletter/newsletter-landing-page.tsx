import { cn } from "@/lib/utils"
import { outfit } from "../fonts"
import NewsletterSignUpForm from "./newsletter-signup-form"
import { tags as allTags } from "@/lib/tags"

interface ContentBoxProps {
  // title: string
  // description: string
  // imageUrl: string
  className?: string
  // variant?: "primary" | "secondary"
}

export default function NewsletterLandingPage({
  // title,
  // description,
  // imageUrl,
  className,
  // variant = "primary",
}: ContentBoxProps) {
  function getRandomTags(tags: string[], count: number) {
    const shuffled = [...tags].sort(() => 0.5 - Math.random())
    const unique = Array.from(new Set(shuffled))
    return unique.slice(0, count)
  }

  const tags = getRandomTags(allTags, 38)

  return (
    <div
      className={cn(
        "w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 my-4 sm:my-6 lg:my-8 p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl lg:rounded-4xl ",
        outfit.className,
        className,
      )}
    >
      <div className="flex-1 rounded-xl p-2 sm:p-3 lg:p-4 break-words">
        <div className="flex flex-col justify-between">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
            Craft in the silence between worlds. Inspire. Evolve.
          </h1>
          <h3 className="text-lg sm:text-xl font-bold mt-3 lg:mt-4">Summon Your Work to the Gilded Spire</h3>
          <p className="mt-2 text-sm sm:text-base">
            Join the early wave of visionary creators.
            <br className="hidden sm:block" />
            Be the first to step into a new realm of inspiration, <br className="hidden md:block" />
            recognition, and creative power.
          </p>
                  <div className="mt-3 sm:mt-4">
          <NewsletterSignUpForm />
        </div>
        </div>

      </div>
      <div className="flex-1 rounded-xl mt-4 lg:mt-0">
        <div className="flex flex-wrap gap-1.5 sm:gap-2 items-end justify-center lg:justify-end">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="text-sm sm:text-base lg:text-lg font-bold px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 lg:py-2 bg-accent/50 hover:ring-2 active:ring-2 active:ring-lime-400 active:bg-lime-400/5 hover:ring-lime-400 rounded-md lg:rounded-lg hover:bg-lime-400/5 transition-all duration-100"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

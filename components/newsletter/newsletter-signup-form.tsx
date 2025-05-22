"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { insertNewsletterEmail } from "@/app/actions/NewsLetterAction"
// import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
})

export default function NewsletterSignUpForm() {
  // const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const response = await insertNewsletterEmail(values.email)
      
      // toast({
      //   title: "Success!",
      //   description: "You've been added to our newsletter.",
      // })
      console.log(response)
      if (response.code === 200) {
        form.reset()
      }else if (response.code === 409) {
        form.setError("email", { type: "manual", message: "Email already exists" })
      }
      // form.reset()
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: error instanceof Error ? error.message : "Failed to subscribe",
      //   variant: "destructive",
      // })
      console.log(error)

      form.setError("email", { type: "manual", message: "Something went wrong ;(" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Join our newsletter</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Email" 
                  className="py-5 text-lg w-full bg-background" 
                  {...field} 
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="py-5 px-8 text-lg w-full md:w-34 "
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoaderCircle className="animate-spin"/> : "Join Now"}
        </Button>
      </form>
    </Form>
  )
}
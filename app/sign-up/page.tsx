import SignUpForm from "@/components/auth-forms/sign-up";




// https://assets.purrfecto.design/DefaultAvatars/Default-04.png

export default function SignUpPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Sign Up</h1>
      <p className="text-sm text-muted-foreground">
        Create an account to get started.
      </p>
      <SignUpForm />
    </div>
  );
}

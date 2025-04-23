import SignInForm from "@/components/auth-forms/sign-in";




// https://assets.purrfecto.design/DefaultAvatars/Default-04.png

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen p-4 space-y-4">
      <SignInForm />
    </div>
  );
}

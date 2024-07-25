import AuthIntro from "@/components/auth/AuthIntro";
import SignInButton from "@/components/SignInButton";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center min-h-screen page-bg-gradient">
      <div className="flex flex-col items-center space-y-6">
        <AuthIntro />
        <SignInButton />
      </div>
    </section>
  );
}

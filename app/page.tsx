import AuthIntro from "@/components/AuthIntro";

export default function Home() {

  return (
    <section className="flex flex-col items-center justify-center min-h-screen page-bg-gradient">
      <div className="space-y-6">
        <AuthIntro />
      </div>
    </section>
  );
}

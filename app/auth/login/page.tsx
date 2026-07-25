import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/today");

  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <h1 className="font-display text-6xl font-bold tracking-tight text-navy">
            FORGED
          </h1>
          <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-text-muted">
            Daily proof of identity
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

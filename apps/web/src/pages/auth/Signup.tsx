import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";
import IMAGE_1 from "@/assets/wood_king.png";
import { useSignupFacade } from "@/features/auth/hooks/useSignup";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleSubmit, submit, register, errors, isPending } =
    useSignupFacade();

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT — Brand / Experience Panel */}
        <section className="relative hidden overflow-hidden bg-muted lg:flex">
          {/* Decorative gradients */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          {/* Hotel Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${IMAGE_1}')`,
            }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <div>
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Bottom Content */}
            <div className="max-w-xl text-white">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Welcome to Nivara
              </div>

              <h1 className="text-4xl leading-tight font-light tracking-tight xl:text-6xl">
                Your next escape
                <span className="block font-medium italic">starts here.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/70 xl:text-base">
                Create your Nivara account and unlock a simpler way to discover,
                book, and manage your stays.
              </p>

              {/* Benefits */}
              <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
                <div>
                  <p className="font-medium text-white">Effortless booking</p>
                  <p className="mt-1 text-xs text-white/50">
                    Reserve your stay in moments
                  </p>
                </div>

                <div>
                  <p className="font-medium text-white">Manage your stays</p>
                  <p className="mt-1 text-xs text-white/50">
                    Everything in one place
                  </p>
                </div>

                <div>
                  <p className="font-medium text-white">Member benefits</p>
                  <p className="mt-1 text-xs text-white/50">
                    Exclusive offers & experiences
                  </p>
                </div>

                <div>
                  <p className="font-medium text-white">Trusted hospitality</p>
                  <p className="mt-1 text-xs text-white/50">
                    Support whenever you need it
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT — Signup Panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-7">
              <h2 className="text-3xl font-semibold tracking-tight">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Join Nivara and make your next stay unforgettable.
              </p>
            </div>

            {/* Signup Card */}
            <Card
              className="border-border/60 bg-card p-6 shadow-sm sm:p-8"
              onSubmit={handleSubmit(submit)}
            >
              <form className="space-y-5">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>

                  <div className="relative">
                    <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      autoComplete="name"
                      className="h-11 pl-10"
                      aria-invalid={!!errors.name}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-11 pl-10"
                      aria-invalid={!!errors.email}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>

                  <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      className="h-11 pr-10 pl-10"
                      aria-invalid={!!errors.password}
                      {...register("password")}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>

                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="h-11 w-full gap-2"
                  disabled={isPending}
                >
                  {isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Sign up
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>

            {/* Login */}
            <p className="mt-7 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to={"/login"}>
                <button className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                  Sign in
                </button>
              </Link>
            </p>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Your information is encrypted and secure
            </div>

            <p className="mt-5 text-center text-[11px] text-muted-foreground/60">
              © {new Date().getFullYear()} Nivara Hotels
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

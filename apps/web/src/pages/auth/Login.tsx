import { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import IMAGE_1 from "@/assets/wood_king.png";
import { Link } from "react-router-dom";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT — Brand / Experience Panel */}
        <section className="relative hidden overflow-hidden bg-muted lg:flex">
          {/* Decorative gradients */}
          <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

          {/* Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('${IMAGE_1}')`,
            }}
          />

          {/* Image overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/25 to-black/10" />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            {/* Logo */}

            <Link to="/">
              <Logo />
            </Link>

            {/* Bottom content */}
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Your journey begins here
              </div>

              <h1 className="text-4xl leading-tight font-light tracking-tight text-white xl:text-6xl">
                Stay somewhere
                <span className="block font-medium italic">unforgettable.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-6 text-white/70 xl:text-base">
                Discover exceptional stays, thoughtful hospitality, and
                beautifully crafted spaces designed around your journey.
              </p>

              <div className="mt-8 flex items-center gap-8 text-xs text-white/60">
                <div>
                  <p className="text-lg font-medium text-white">120+</p>
                  <p>Luxury stays</p>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div>
                  <p className="text-lg font-medium text-white">24/7</p>
                  <p>Guest support</p>
                </div>

                <div className="h-8 w-px bg-white/20" />

                <div>
                  <p className="text-lg font-medium text-white">4.9/5</p>
                  <p>Guest rating</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT — Login Panel */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="mb-10 lg:hidden">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Sign in to manage your reservations and continue your journey
                with Nivara.
              </p>
            </div>

            {/* Login Card */}
            <Card className="border-border/60 bg-card p-6 shadow-sm sm:p-8">
              <form className="space-y-5">
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>

                  <div className="relative">
                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className="h-11 pl-10"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>

                    <button
                      type="button"
                      className="text-xs font-medium text-primary transition-colors hover:text-primary/80"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="h-11 pr-10 pl-10"
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
                </div>

                {/* Remember */}
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" />

                  <Label
                    htmlFor="remember"
                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                  >
                    Keep me signed in
                  </Label>
                </div>

                {/* Submit */}
                <Button type="submit" className="h-11 w-full gap-2">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </Card>

            {/* Signup */}
            <p className="mt-7 text-center text-sm text-muted-foreground">
              Don't have a Nivara account?{" "}
              <button className="font-medium text-foreground underline underline-offset-4 hover:text-primary">
                Create an account
              </button>
            </p>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
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

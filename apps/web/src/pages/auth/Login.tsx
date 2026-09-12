import * as React from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/logo";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <main className="flex min-h-screen flex-col justify-between bg-background">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">
        {/* Left: Hotel Experience */}
        <section className="relative hidden min-h-95 w-full flex-col justify-between overflow-hidden bg-primary p-8 sm:p-12 lg:flex lg:min-h-screen lg:w-[52%] lg:p-16">
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://lh3.googleusercontent.com/aida/AEtjO1W1H2H_p3dBueh0oTbGCjent-BVY7txpLpJiv-LPsw8xHIx6J3dNMGIa6Zo29oZqOhC1uHoeuGzH8uZ8uZW_LdkpO3VQaYPBlctXpOEoUbm9GpFXu558m40KWwThtKFd4GrvRfx9kD1qP23j63QN0Eop2td-SgLfpJ634Tr6r6th_6kTPxXin2n8xUeSv9AAlAO4QScINAR1bBY-WY8bqbUkPrX2Zg7Rqu2FkNJClcvl3_pRMzcPlaVc17U"
              alt="Nivara Hotels Heritage Suite Interior"
              className="h-full w-full scale-105 object-cover object-center brightness-[0.82] contrast-[1.05]"
            />

            <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/50 to-primary/60" />
            <div className="absolute inset-0 bg-primary/20" />
          </div>

          {/* Brand */}
          <div className="relative z-10">
            <Link to="/">
              <Logo />
            </Link>
          </div>

          {/* Narrative */}
          <div className="relative z-10 mt-auto max-w-lg pt-16 pb-8 lg:pb-12">
            <Badge
              variant="secondary"
              className="mb-4 gap-2 border-primary-foreground/15 bg-primary-foreground/10 text-secondary-foreground backdrop-blur-md"
            >
              <span className="size-1.5 animate-pulse rounded-full bg-secondary" />
              Awadhi Hospitality
            </Badge>

            <h1 className="mb-5 text-4xl leading-[1.08] font-normal tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
              A better stay <br />
              <span className="font-light text-secondary-foreground/95 italic">
                begins here.
              </span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
              Welcome back to Nivara Hotels. Sign in to manage your stay,
              reservations, and personalized hospitality experience.
            </p>

            <div className="mt-8 flex items-center justify-between border-t border-primary-foreground/15 pt-6 text-xs font-medium tracking-widest text-primary-foreground/50 uppercase">
              <span>Thoughtful spaces</span>
              <span className="text-secondary">•</span>
              <span>Effortless stays</span>
              <span className="text-secondary">•</span>
              <span>Curated calm</span>
            </div>
          </div>

          {/* Decorative watermark */}
          <div className="pointer-events-none absolute -right-10 -bottom-10 hidden size-64 rounded-full border border-primary-foreground/5 lg:block" />
        </section>

        {/* Right: Login */}
        <section className="flex w-full flex-col items-center justify-center bg-background px-6 py-12 sm:px-12 lg:w-[48%] lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-105">
            {/* Mobile brand */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <Logo />
            </div>

            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold tracking-[0.25em] uppercase">
                  Account Access
                </span>
              </div>

              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Welcome back
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Sign in to continue to your Nivara Hotels account.
              </p>
            </div>

            <form className="space-y-5">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  autoComplete="email"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between pt-1">
                <label
                  htmlFor="remember"
                  className="flex cursor-pointer items-center gap-2 select-none"
                >
                  <Checkbox id="remember" name="remember" />

                  <span className="text-xs font-medium text-muted-foreground">
                    Remember me
                  </span>
                </label>

                <a
                  href="#"
                  className="text-xs font-semibold text-secondary transition-colors hover:text-secondary/80 focus-visible:underline focus-visible:outline-none"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button type="submit" className="group h-12 w-full gap-2">
                  Sign in
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Button>
              </div>
            </form>

            {/* Create account */}
            <div className="mt-8 border-t pt-6 text-center">
              <p className="text-xs text-muted-foreground">
                Don't have an account?{" "}
                <a
                  href="#"
                  className="font-semibold text-secondary transition-colors hover:text-secondary/80"
                >
                  Create account
                </a>
              </p>

              <p className="mt-2 text-[11px] text-muted-foreground/70">
                Hotel staff accounts are provisioned securely by Administration.
              </p>
            </div>

            {/* Footer */}
            <div className="mt-12 flex items-center justify-center gap-4 text-[11px] text-muted-foreground/70">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy Policy
              </a>

              <span>•</span>

              <a href="#" className="transition-colors hover:text-foreground">
                Terms of Stay
              </a>

              <span>•</span>

              <a href="#" className="transition-colors hover:text-foreground">
                Front Desk: 24/7
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

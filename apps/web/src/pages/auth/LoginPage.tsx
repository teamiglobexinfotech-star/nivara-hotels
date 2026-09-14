import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1
        id="signup-main-title"
        className="mb-3 font-serif text-3xl leading-[1.15] font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        Welcome back. <br />
        <span className="font-normal italic">Return to stillness.</span>
      </h1>

      <p
        id="signup-subtitle"
        className="mb-8 text-sm leading-relaxed font-light text-muted-foreground sm:text-base"
      >
        Sign in to review existing reservations, unlock private villa bookings,
        or tailor your arrival rituals.
      </p>
      <form id="customer-registration-form" className="space-y-5" noValidate>
        {/* 2. EMAIL FIELD */}
        <div id="form-field-email-group" className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="customer-email"
              className="text-xs font-medium tracking-[0.16em] text-foreground/90 uppercase"
            >
              Email Address
            </Label>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <Mail className="h-4 w-4" />
            </div>
            <Input
              id="customer-email"
              name="email"
              type="email"
              placeholder="eleanor@sanctuary.luxury"
              className="h-12 rounded-xl border-border bg-card/60 pl-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="email"
            />
          </div>
        </div>

        {/* 3. PASSWORD FIELD */}
        <div id="form-field-password-group" className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="customer-password"
              className="text-xs font-medium tracking-[0.16em] text-foreground/90 uppercase"
            >
              Password
            </Label>

            <button
              type="button"
              onClick={() =>
                alert("A reset link has been simulated to your email.")
              }
              className="text-[11px] text-primary hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <Lock className="h-4 w-4" />
            </div>
            <Input
              id="customer-password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={"Create a secure password (8+ chars)"}
              className="h-12 rounded-xl border-border bg-card/60 pr-11 pl-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete={"new-password"}
            />
            <button
              type="button"
              id="toggle-password-visibility-btn"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
              title={showPassword ? "Hide password" : "Show password"}
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* 5. SUBMIT BUTTON */}
        <div className="pt-2">
          <Button
            type="submit"
            id="submit-registration-btn"
            variant="luxury"
            size="luxuryLg"
            className="h-12 w-full justify-center text-xs sm:text-sm"
          >
            <span className="flex items-center gap-2">
              <span>Log in</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </form>
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to={"/signup"} className="text-foreground underline">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}

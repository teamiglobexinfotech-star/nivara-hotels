import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h1
        id="signup-main-title"
        className="mb-3 font-serif text-3xl leading-[1.15] font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        Begin your stay. <br />
        <span className="font-normal italic">Become a patron.</span>
      </h1>

      <p
        id="signup-subtitle"
        className="mb-8 text-sm leading-relaxed font-light text-muted-foreground sm:text-base"
      >
        Register as a Nivara patron for private residence rates, bespoke
        in-suite wellness, and priority dining reservations.
      </p>
      <form id="customer-registration-form" className="space-y-5" noValidate>
        <div id="form-field-name-group" className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="customer-name"
              className="text-xs font-medium tracking-[0.16em] text-foreground/90 uppercase"
            >
              Full Name
            </Label>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
              <User className="h-4 w-4" />
            </div>
            <Input
              id="customer-name"
              name="name"
              type="text"
              placeholder="Eleanor Vance"
              className="h-12 rounded-xl border-border bg-card/60 pl-10 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:ring-1 focus:ring-primary"
              autoComplete="name"
            />
          </div>
        </div>

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

            {/* <button
            type="button"
            onClick={() =>
              alert("A reset link has been simulated to your email.")
            }
            className="text-[11px] text-primary hover:underline"
          >
            Forgot password?
          </button> */}
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

        {/* 4. CHECKBOXES FOR TERMS & PRIVACY */}
        <div className="space-y-3 pt-2">
          <div className="flex items-start gap-2.5">
            <Checkbox id="customer-terms-checkbox" className="mt-0.5" />
            <label
              htmlFor="customer-terms-checkbox"
              className="cursor-pointer text-xs leading-snug text-muted-foreground select-none"
            >
              I accept the{" "}
              <span className="text-foreground underline underline-offset-2">
                Sanctuary Charter
              </span>{" "}
              and acknowledge the hotel privacy & guest confidentiality policy.
            </label>
          </div>

          <div className="flex items-start gap-2.5">
            <Checkbox id="customer-journal-checkbox" className="mt-0.5" />
            <label
              htmlFor="customer-journal-checkbox"
              className="cursor-pointer text-xs leading-snug text-muted-foreground select-none"
            >
              Receive private seasonal invitations and culinary monographs from
              our estate.
            </label>
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
              <span>Sign up</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>
      </form>
      <div className="mt-10 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to={"/login"} className="text-foreground underline">
            Log in
          </Link>
        </p>
      </div>
    </>
  );
}

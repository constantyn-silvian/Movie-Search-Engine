import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800">
      <div className="w-full max-w-md p-8 rounded-2xl bg-gradient-to-b from-blue-800/95 to-indigo-900/95 border border-white/10 shadow-lg shadow-indigo-500/50">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-blue-100/80">Sign in to your account</p>
        </div>

        <FieldSet>
          <FieldGroup className="text-white">
            <Field>
              <FieldLabel htmlFor="username" className="font-semibold text-sm">
                Username
              </FieldLabel>
              <Input
                id="username"
                type="text"
                placeholder="Max Leiter"
                className="mt-2 w-full rounded-md bg-white/6 border border-white/12 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <FieldDescription className="mt-2 text-xs text-blue-100/70">
                Choose a unique username for your account.
              </FieldDescription>
            </Field>

            <Field className="mt-4">
              <FieldLabel htmlFor="password" className="font-semibold text-sm">
                Password
              </FieldLabel>
              <FieldDescription className="mt-1 text-xs text-blue-100/70">
                Must be at least 8 characters long.
              </FieldDescription>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="mt-2 w-full rounded-md bg-white/6 border border-white/12 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
            </Field>

            <Button className="mt-6 w-full rounded-md bg-linear-to-r from-amber-400 to-orange-500 text-black font-bold hover:from-amber-500 hover:to-orange-600 shadow-md">
              Sign In
            </Button>

            <div className="mt-3 flex items-center justify-between text-xs  ">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" className="accent-amber-400" />
                Remember me
              </label>
              <button className="underline underline-offset-2 hover:text-white">Forgot password?</button>
            </div>
          </FieldGroup>
        </FieldSet>
      </div>
    </div>
  )
}

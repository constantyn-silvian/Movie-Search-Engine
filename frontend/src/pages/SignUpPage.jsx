import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"

export default function SignUpPage() {  
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-slate-950 via-gray-900 to-gray-800">
            <div className="w-full max-w-md p-8 bg-linear-to-b from-blue-800/95 to-indigo-900/95 rounded-2xl border border-white/10 shadow-lg shadow-indigo-500/50">
                <div className="mb-6 text-center">
                    <h2 className="text-white text-2xl font-bold">Create Account</h2>
                    <p className="mt-1 text-blue-100/80">Sign up to get started!</p>
                </div>
                <FieldGroup>
                    <FieldSet className="text-white">
                        <Field>
                            <FieldLabel htmlFor="username" className="font-semibold text-sm">
                                Username
                            </FieldLabel>
                            <Input
                            id="username"
                            type="text" 
                            placeholder="Cosmin Drignei"
                            className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 mt-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300" 
                            />
                            <FieldDescription className="mt-1 text-xs text-blue-100/70">
                                Choose a unique username for your account.
                            </FieldDescription>
                        </Field>
                        <Field className="mt-4">
                            <FieldLabel htmlFor="password" className="font-semibold text-sm">
                                Password
                            </FieldLabel>
                            <Input 
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="w-full rounded-md border border-white/20 bg-white/5 px-3 py-2 mt-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
                            />
                            <FieldDescription className="mt-1 text-xs text-blue-100/70">
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field className="mt-4">
                            <FieldLabel htmlFor="confirm-password" className="font-semibold text-xs">Confirm Password</FieldLabel>
                            <Input 
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="mt-2 rounded-md border border-white/20 bg-white/5 px-3 py-2 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
                            ></Input>
                        </Field>
                        <Button className="mt-6 w-full text-black bg-linear-to-r from-amber-400 to-orange-500 text-sm font-bold hover:from-amber-500 hover:to-orange-600 shadow-md">
                            Create Account
                        </Button>
                        <div className="flex flex-row items-center justify-end text-xs mt-3 text-white/80 ">
                            <button onClick={() => { navigate("/signin") }} className="underline underline-offset-2 hover:text-white">Already have an account? Sign In</button>
                        </div>
                    </FieldSet>
                </FieldGroup>
            </div>
        </div>
    )
}

import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router-dom"
import { WarningBox } from "@/components/WarningBox"

export default function SignInPage() {
  const navigate = useNavigate();
  const [warn, setWarn] = useState(null);
  const [warnType, setWarnType] = useState("warning");

  const handleSignIn = (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const rememberMe = document.querySelector("input[type='checkbox']").checked;
    if (username.trim() === "" || password.trim() === "") {
      setWarn("Username and password cannot be empty");
      setWarnType("error");
      return;
    }
    if (password.length < 8) {
      setWarn("Password must be at least 8 characters long");
      setWarnType("error");
      return;
    }
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        if (rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }
        setWarn("Login successful");
        setWarnType("success");
      } else {
        setWarn(data.message);
        setWarnType("error");
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        {warn && (
                  <WarningBox
                      message={warn}
                      type={warnType}
                      autoDismiss={1000}
                      onClose={() => {
                          setWarn(null);
                          setWarnType("warning");
                          window.location.href = '/';
                      }}
                  />
              )}
      <div className="w-full max-w-md p-8 rounded-2xl bg-linear-to-b from-blue-800/95 to-indigo-900/95 border border-white/10 shadow-xl shadow-indigo-900/40">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-extrabold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-blue-100/80">Sign in to your account</p>
        </div>
        <form onSubmit={handleSignIn}>
          <FieldSet >
            <FieldGroup className="text-white" >
              <Field>
                <FieldLabel htmlFor="username" className="font-semibold text-sm">
                  Username
                </FieldLabel>
                <Input
                  id="username"
                  type="text"
                  placeholder="Cosmin Drignei"
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

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2 w-full rounded-md bg-white/6 border border-white/12 px-3 py-2 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
                <FieldDescription className="mt-1 text-xs text-blue-100/70">
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>

              <Button type="submit" className="mt-6 w-full rounded-md bg-linear-to-r from-amber-400 to-orange-500 text-black font-bold hover:from-amber-500 hover:to-orange-600 shadow-md">
                Sign In
              </Button>

              <div className="mt-3 flex items-center justify-between text-xs  ">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="accent-amber-400" />
                  Remember me
                </label>
                <button onClick={() => { alert("Să fii sănătos!") }} className="underline underline-offset-2 cursor-pointer hover:text-white">Forgot password?</button>
              </div>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  )
}

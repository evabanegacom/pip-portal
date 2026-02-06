import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema } from "@/schemas/login-schema"
import type { LoginFormData } from "@/schemas/login-schema"
import { useLoginMutation } from "@/redux/requests/auth-api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toastSuccess, toastError } from "@/lib/utils"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const [login, { isLoading }] = useLoginMutation()
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      oneToken: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data).unwrap()
      console.log("Login successful:", result)
      toastSuccess("Login successful!")
    } catch (err: any) {
      console.error("Login failed:", err)
      toastError(err?.data?.message || "Login failed. Please try again.")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        {/* Header / Branding */}
        <div className="text-center">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Sterling</h1>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Log in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Kindly enter your details to login to the portal
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          {/* Email Address */}
          <div className="space-y-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="username"
              type="email"
              placeholder="Salmon.Abdulahi@sterling.ng"
              {...register("username")}
              className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500 placeholder:text-gray-400"
            />
            {errors.username && (
              <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                {...register("password")}
                className="h-11 border-gray-300 focus:border-red-500 focus:ring-red-500 pr-10 placeholder:text-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* One Time Token */}
          <div className="space-y-1">
            <label htmlFor="oneToken" className="block text-sm font-medium text-gray-700">
              One Time Token
            </label>
            <InputOTP
              maxLength={6}
              onChange={(value) => setValue("oneToken", value, { shouldValidate: true })}
            >
              <InputOTPGroup className="gap-3 justify-center">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-11 w-11 text-center text-lg border border-gray-300 rounded-md focus:border-red-500 focus:ring-red-500 data-[active=true]:border-red-500 data-[active=true]:ring-1 data-[active=true]:ring-red-500"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
            {errors.oneToken && (
              <p className="text-red-600 text-xs mt-1">{errors.oneToken.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
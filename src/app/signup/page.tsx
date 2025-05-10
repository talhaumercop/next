"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function Signup() {
  const router = useRouter()
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  })

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  useEffect(() => {
    if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
      setIsButtonDisabled(false)
    } else {
      setIsButtonDisabled(true)
    }
  }, [user])
  const onSignUp = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("sign up successfull", response.data)
      router.push("/login")
    } catch (error: any) {
      toast.error(error.message)
      console.log(error, "signup failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 via-zinc-900 to-black px-4">
      <div className="w-full max-w-md bg-zinc-900 shadow-xl rounded-3xl p-10 space-y-8 backdrop-blur-md bg-opacity-90 border border-gray-700">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-poppins">Create Account</h1>
          <p className="text-gray-400 text-sm">Join us today and start your journey</p>
        </div>
        <hr className="border-t border-gray-700" />

        <div className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-300">Username</label>
            <input
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Choose a username"
              className="w-full p-4 bg-zinc-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="you@example.com"
              className="w-full p-4 bg-zinc-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="••••••••"
                className="w-full p-4 bg-zinc-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <button
            onClick={onSignUp}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
          >
            {isButtonDisabled ? "Please fill all the fields" : "Sign Up"}
          </button>

          <div className="text-center space-y-2">
            <p className="text-gray-400">
              Already have an account?
              <Link href="/login" className="ml-2 text-purple-400 font-semibold hover:text-purple-500 transition-colors">Log in</Link>
            </p>
            {isLoading && <p className="text-gray-400">Loading...</p>}
          </div>
        </div>
      </div>
    </div>


  );
}

"use client"
import React, { use } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";


export default function Login() {
  const router= useRouter()
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })

  const [loading, setLoading] = React.useState(false)
  const onLogin = async() => {
    try {
      setLoading(true)
      const response= await axios.post("/api/users/login",user)
      console.log(response)
      toast.success("Login successful")
      router.push("/profile")
    } catch (error:any) {
      console.log("login failed",error)
      return toast.error("Invalid credentials")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
  <div className="w-full max-w-md bg-zinc-900 shadow-xl rounded-3xl p-10 space-y-8 backdrop-blur-md bg-opacity-90 border border-gray-700">
    <div className="text-center space-y-2">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-poppins">Welcome Back</h1>
      <p className="text-gray-400 text-sm">Please sign in to continue</p>
    </div>
    <hr className="border-t border-gray-700" />

    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); }}>
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-300">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => { setUser({ ...user, email: e.target.value }) }}
          placeholder="you@example.com"
          className="w-full p-4 bg-zinc-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-semibold text-gray-300">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => { setUser({ ...user, password: e.target.value }) }}
          placeholder="••••••••"
          className="w-full p-4 bg-zinc-800 border border-gray-600 text-white rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-400 transition-all duration-200"
        />
      </div>

      <button
        type="submit"
        onClick={onLogin}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
      >
        Log In
      </button>
    </form>

    <div className="text-center space-y-2">
      <p className="text-gray-400">
        Don't have an account?
        <Link href="/signup" className="ml-2 text-purple-400 font-semibold hover:text-purple-500 transition-colors">Sign up</Link>
      </p>
      {loading && <p className="text-gray-400">Loading...</p>}
    </div>
  </div>
</div>

  );
}

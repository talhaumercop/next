"use client"
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toast } from "react-hot-toast";
import Link from "next/link";


export default function Profile() {
  const [data,setData]=useState("nothing");
  const getData=async()=>{
    try {
      const response=await axios.get("/api/users/me");
      setData(response.data.data._id);
      console.log(response.data);
    } catch (error:any) {
      return toast.error(error.response.data.message);
    }
  }
  const router= useRouter()
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="min-h-screen bg-[#0e0e10] text-white font-sans">
      {/* Navigation Bar */}
      <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[95%] md:w-[90%] max-w-6xl z-50 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-bold tracking-wide text-white">
          <span className="text-teal-400">Dev</span>Profile
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm">
          <a href="#" className="hover:text-teal-400 transition duration-200">Home</a>
          <a href="#" className="hover:text-teal-400 transition duration-200">Projects</a>
          <a href="#" className="hover:text-teal-400 transition duration-200">Contact</a>
        </div>

        {/* Logout Button */}
        <button
        onClick={handleLogout}
         className="px-4 py-2 rounded-xl bg-gradient-to-tr from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 transition duration-200 text-sm font-medium shadow-md">
          Logout
        </button>
      </nav>

      {/* Page Content */}
      <div className="pt-28 px-4 w-full flex justify-center  items-center">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold mb-4">Profile</h1>
          <h2 className="text-2xl font-bold mb-4">
            Name:{data=== "nothing" ? "Nothing":
            <Link href={`/profile/${data}`}>{data}</Link>
            }
          </h2>
          <p className="text-gray-400">Welcome to your beautiful glassy profile page.</p>
          <button onClick={getData} className="px-4 py-2 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 hover:from-pink-600 hover:to-red-600 transition duration-200 text-sm font-medium shadow-md">Get User Data</button>
        </div>
      </div>
    </div>
  );
}

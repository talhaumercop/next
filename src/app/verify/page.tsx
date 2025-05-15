"use client"
import axios from "axios"
import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"

export default function VerifyPage(){
    const searchParams = useSearchParams()
    const [token, setToken] = useState("")
    const [isVerified, setIsVerified] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const verifyUserEmail = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/verifyemail", {token})
            setIsVerified(true)
            setError(false)
            console.log(response)
        } catch (error:any) {
            setError(true)
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const urlToken = searchParams.get("token")
        if (urlToken) {
            setToken(urlToken)
        }
    }, [searchParams])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex bg-zinc-900 flex-col items-center justify-center h-screen">
            {loading && (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-amber-50">Verifying your account...</h1>
                    <p className="text-sm text-gray-500">Please wait while we verify your account.</p>
                </div>
            )}
            {isVerified && !loading && (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-green-500">Account verified successfully</h1>
                    <Link href="/login" className="text-blue-500">Login</Link>
                </div>
            )}
            {error && !loading && (
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold text-red-500">Verification failed</h1>
                    <p className="text-sm text-gray-500">Please try again or contact support.</p>
                </div>
            )}
        </div>
    )
}
import Head from 'next/head'
import Link from 'next/link'
import { useState,useContext, useEffect } from 'react'

const Signin = () => {
    return(
    <div className="relative flex items-center justify-center py-2 bg-no-repeat bg-cover">
        <Head>
            <title>Signin</title>
        </Head>
    <div className="mt-2 items-center z-10 ">
        <form className="bg-white max-w-sm mx-auto rounded-xl shadow-xl overflow-hidden p-6 sm:p-20 space-y-10 border border-r-2 border-indigo-200 ">
            <h2 className="text-4xl font-bold text-center text-indigo-600">Login</h2>
            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="email" name="email" placeholder="Email"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                {/* <label for="email"
                    className="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0">Email</label> */}
            </div>
            <div className="f-outline px-2 relative border rounded-lg focus-within:border-indigo-500">
                <input type="password" name="password" placeholder="Password"
                    className="block p-2 w-full text-lg appearance-none focus:outline-none bg-transparent" />
                {/* <label for="password"
                    className="absolute ml-5 top-0 text-lg text-gray-700 bg-white mt-2 -z-1 duration-300 origin-0">Password</label> */}
            </div>
            <div className="block mt-2">
                <label for="" className="flex items-center">
                    <input type="checkbox"
                        className="ml-2 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    </input>
                    <span className="ml-2 text-sm text-gray-600">Remember me</span>
                </label>
            </div>
            <div className="flex items-center justify-end mt-4">
                <a className="underline text-sm text-gray-600 hover:text-gray-900" href="/register">
                    Dont have an account?
                </a>
                <button
                    className="px-6 py-2 ml-4 font-semibold cursor-pointer text-center focus:outline-none transition hover:shadow-lg shadow hover:bg-indigo-700 rounded-full text-white bg-indigo-600 ">
                    Log in
                </button>
            </div>
        </form>
    </div>
    </div>
)

}

export default Signin
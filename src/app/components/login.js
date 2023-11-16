"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from "next-auth/react";

export default function login() {
    const router = useRouter();
    const [data, setData] = useState({
        email:'',
        password:''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Attempt to sign in with provided credentials
      const result = await signIn('credentials', {
        ...data,
        redirect: false,
      });
  
      // Check the result of the sign-in attempt
      if (result?.error) {
        console.error('Failed to sign in:', result.error);
  
        // Display an alert with the error message
        alert('Failed to sign in');
      } else {
        // Successful sign-in, redirect to the dashboard
        router.push('/dashboard');
      }
    };

    
    return (
        <>
          {/*
            This example requires updating your template:
    
            ```
            <html class="h-full bg-white">
            <body class="h-full">
            ```
          */}
          <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-5 text-center text-5xl font-bold leading-12 tracking-tight text-gray-900">
                Log in to your account
              </h2>
              <div className="flex items-center justify-center mt-4 text-lg font-bold">
                <p>Don't have an account?</p>
                <a className=" text-indigo-600 hover:text-indigo-500 pl-2" href="/login">
                Sign Up
                </a>
              </div>
            </div>
    
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-base font-medium leading-6 text-gray-900">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e)=>{setData({...data, email: e.target.value})}}
                      required
                      className=" p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-base font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="text-sm">
                      <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                      </a>
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e)=>{setData({...data, password: e.target.value})}}
                      required
                      className="p-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-rose-500 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-rose-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
    )
}


'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

export default function Track() {

  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-20 font-sans">
      <header className="w-full flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <div className="w-6 h-6 bg-blue-600"></div>
          <h1 className="text-2xl font-semibold">InternshipPilot</h1>
        </div>
        <nav className="space-x-6 text-sm">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/track" className="hover:text-gray-300">Track Applications</Link>
          <a href="#" className="hover:text-gray-300">Profile</a>
        </nav>
      </header>
      <main className="w-full max-w-6xl mx-auto">
        <section className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800">
          <h2 className="text-xl font-medium mb-4">My Internship Applications</h2>
          <div className="space-y-4">
            <div className="bg-neutral-950 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Software Engineering Intern</h3>
                <p className="text-sm text-gray-400">TechCorp Inc. - San Francisco, CA</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <Checkbox
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2">Applied</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <Checkbox
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2">Response Received</span>
                </label>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
            <div className="bg-neutral-950 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-medium">Data Analyst Intern</h3>
                <p className="text-sm text-gray-400">DataWorks LLC - New York, NY</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <Checkbox
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2">Applied</span>
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <Checkbox
                    className="h-5 w-5 text-blue-600 rounded"
                  />
                  <span className="ml-2">Response Received</span>
                </label>
              </div>
              <div className="mt-4 sm:mt-0">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-12 w-full text-center text-gray-500 text-sm">
        © 2025 Internship Tracker. All rights reserved.
      </footer>
    </div>
  );
}

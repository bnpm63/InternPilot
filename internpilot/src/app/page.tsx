import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
      <main className="grid grid-cols-1 sm:grid-cols-3 gap-12 w-full max-w-6xl mx-auto">
        <div className="col-span-1 flex flex-col gap-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800 flex flex-col items-start">
              <h2 className="text-l font-normal mb-4 text-gray-400">Applications Submitted</h2>
              <p className="text-2xl font-medium">24</p>
            </div>
            <div className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800 flex flex-col items-start">
              <h2 className="text-l font-normal mb-4 text-gray-400">Responses Submitted</h2>
              <p className="text-2xl font-medium">18</p>
            </div>
          </div>
          <section className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800">
            <h2 className="text-xl font-medium mb-4">Upload Your Resume</h2>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <p className="mb-4 text-gray-400">Drag and drop your resume here, or click to upload.</p>
              <input type="file" id="resumeUpload" className="hidden" />
              <label htmlFor="resumeUpload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
                Upload Resume
              </label>
            </div>
          </section>
        </div>
        <div className="col-span-2 flex flex-col gap-8">
          <section className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
              <select className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white text-sm">
                <option value="">Filter by Location</option>
                <option value="all">All Locations</option>
                <option value="ny">New York</option>
                <option value="sf">San Francisco</option>
                <option value="la">Los Angeles</option>
              </select>
              <select className="bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white text-sm">
                <option value="">Sort by Date Posted</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
            <h2 className="text-xl font-medium mb-4">Internship Recommendations</h2>
            <div className="space-y-4">
              <div className="outline outline-neutral-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Software Engineering Intern</h3>
                  <p className="text-sm text-gray-400">TechCorp Inc. - San Francisco, CA</p>
                </div>
                <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Apply Now
                </button>
              </div>
              <div className="outline outline-neutral-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Data Analyst Intern</h3>
                  <p className="text-sm text-gray-400">DataWorks LLC - New York, NY</p>
                </div>
                <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Apply Now
                </button>
              </div>
              <div className="outline outline-neutral-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">AI Research Intern</h3>
                  <p className="text-sm text-gray-400">Atreides Technologies - Seattle, WA</p>
                </div>
                <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                  Apply Now
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="mt-12 w-full text-center text-gray-500 text-sm">
        © 2025 Internship Tracker. All rights reserved.
      </footer>
    </div>
  );
}

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white p-8 sm:p-20 font-sans">
      <header className="w-full flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <Image src="/logo.svg" alt="Internship Tracker Logo" width={50} height={50} />
          <div className="w-6 h-6 bg-blue-600"></div>
          <h1 className="text-2xl font-semibold">InternshipPilot</h1>
        </div>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:text-gray-300">Dashboard</a>
          <a href="#" className="hover:text-gray-300">Internships</a>
          <a href="#" className="hover:text-gray-300">Profile</a>
          <a href="#" className="hover:text-gray-300">Settings</a>
        </nav>
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-12 w-full max-w-6xl mx-auto">
        <div className="flex flex-col gap-8">
          <section className="bg-neutral-950 rounded-lg p-8 outline-1 outline-neutral-800">
            <h2 className="text-xl font-medium mb-4">Upload Your Resume</h2>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <p className="mb-4 text-gray-400">
                Drag and drop your resume here, or click to upload.
              </p>
              <input type="file" id="resumeUpload" className="hidden" />
              <label
                htmlFor="resumeUpload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Upload Resume
              </label>
            </div>
          </section>
          <section className="bg-neutral-950 rounded-lg p-8 outline-1 outline-neutral-800">
            <h2 className="text-xl font-medium mb-4">Filter Results</h2>
            <select className="w-full bg-gray-800 border border-gray-600 rounded-lg p-2 text-white">
              <option value="all">All Internships</option>
              <option value="software">Software Engineering</option>
              <option value="data">Data Analytics</option>
              <option value="design">Design</option>
            </select>
          </section>
        </div>
        <section className="bg-neutral-950 rounded-lg p-8 outline-1 outline-neutral-800">
          <h2 className="text-xl font-medium mb-4">Internship Recommendations</h2>
          <div className="space-y-4">
            <div className="outline-neutral-800 outline-1 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Software Engineering Intern</h3>
                <p className="text-sm text-gray-400">TechCorp Inc. - San Francisco, CA</p>
              </div>
              <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Apply Now
              </button>
            </div>
            <div className="outline-neutral-800 outline-1 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Data Analyst Intern</h3>
                <p className="text-sm text-gray-400">DataWorks LLC - New York, NY</p>
              </div>
              <button className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Apply Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-12 w-full text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Internship Tracker. All rights reserved.
      </footer>
    </div>
  );
}

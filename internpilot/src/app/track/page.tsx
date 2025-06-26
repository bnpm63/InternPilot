'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";

interface Internship {
  id: string;
  title: string;
  company: string;
  location: string;
  applied: boolean;
  responseReceived: boolean;
}

export default function Track() {
  const [internships, setInternships] = useState<Internship[]>([
    {
      id: '1',
      title: 'Software Engineering Intern',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      applied: true,
      responseReceived: false
    },
    {
      id: '2',
      title: 'Data Analyst Intern',
      company: 'DataWorks LLC',
      location: 'New York, NY',
      applied: true,
      responseReceived: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newInternship, setNewInternship] = useState({
    title: '',
    company: '',
    location: ''
  });

  const handleAddInternship = () => {
    if (newInternship.title && newInternship.company && newInternship.location) {
      const internship: Internship = {
        id: Date.now().toString(),
        title: newInternship.title,
        company: newInternship.company,
        location: newInternship.location,
        applied: false,
        responseReceived: false
      };
      setInternships([...internships, internship]);
      setNewInternship({ title: '', company: '', location: '' });
      setShowAddForm(false);
    }
  };

  const handleCheckboxChange = (id: string, field: 'applied' | 'responseReceived') => {
    setInternships(internships.map(internship => 
      internship.id === id 
        ? { ...internship, [field]: !internship[field] }
        : internship
    ));
  };

  const handleDeleteInternship = (id: string) => {
    setInternships(internships.filter(internship => internship.id !== id));
  };

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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">My Internship Applications</h2>
            <button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              {showAddForm ? 'Cancel' : 'Add Internship'}
            </button>
          </div>

          {showAddForm && (
            <div className="bg-neutral-900 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium mb-4">Add New Internship</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Internship Title"
                  value={newInternship.title}
                  onChange={(e) => setNewInternship({...newInternship, title: e.target.value})}
                  className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={newInternship.company}
                  onChange={(e) => setNewInternship({...newInternship, company: e.target.value})}
                  className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={newInternship.location}
                  onChange={(e) => setNewInternship({...newInternship, location: e.target.value})}
                  className="bg-neutral-800 border border-neutral-700 rounded px-3 py-2 text-white placeholder-gray-400"
                />
              </div>
              <button 
                onClick={handleAddInternship}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Add Internship
              </button>
            </div>
          )}

          <div className="space-y-4">
            {internships.map((internship) => (
              <div key={internship.id} className="bg-neutral-950 rounded-lg p-6 flex items-center justify-between gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-white mb-1">{internship.title}</h3>
                  <p className="text-sm text-gray-400">{internship.company} - {internship.location}</p>
                </div>
                <div className="flex items-center gap-6">
                  <label className="inline-flex items-center cursor-pointer">
                    <Checkbox
                      checked={internship.applied}
                      onCheckedChange={() => handleCheckboxChange(internship.id, 'applied')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm">Applied</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <Checkbox
                      checked={internship.responseReceived}
                      onCheckedChange={() => handleCheckboxChange(internship.id, 'responseReceived')}
                      className="h-5 w-5 text-blue-600 rounded"
                    />
                    <span className="ml-2 text-sm">Response Received</span>
                  </label>
                  <button 
                    onClick={() => handleDeleteInternship(internship.id)}
                    className="w-8 h-8 flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
                    title="Delete internship"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="mt-12 w-full text-center text-gray-500 text-sm">
        © 2025 Internship Tracker. All rights reserved.
      </footer>
    </div>
  );
}

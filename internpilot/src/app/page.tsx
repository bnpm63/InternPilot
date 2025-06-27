'use client';
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface FeedbackItem {
  id: string;
  suggestion: string;
  impact: string;
  action: string;
}

export default function Home() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseFeedback = (feedbackText: string): FeedbackItem[] => {
    const items: FeedbackItem[] = [];
    const sections = feedbackText.split(/(?=Suggestion:|Impact:|Action:)/);
    
    let currentItem: Partial<FeedbackItem> = {};
    
    sections.forEach(section => {
      if (section.includes('Suggestion:')) {
        if (currentItem.suggestion) {
          items.push(currentItem as FeedbackItem);
        }
        currentItem = { id: Date.now().toString() + Math.random() };
        currentItem.suggestion = section.replace('Suggestion:', '').trim();
      } else if (section.includes('Impact:')) {
        currentItem.impact = section.replace('Impact:', '').trim();
      } else if (section.includes('Action:')) {
        currentItem.action = section.replace('Action:', '').trim();
      }
    });
    
    if (currentItem.suggestion) {
      items.push(currentItem as FeedbackItem);
    }
    
    return items;
  };

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          resolve(text);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'text/plain',
      'application/pdf'
    ];

    if (!allowedTypes.includes(file.type)) {
      alert('Please upload a Word document (.doc, .docx), PDF, or text file.');
      return;
    }

    setIsLoading(true);
    setUploadedFileName(file.name);

    try {
      let resumeText = '';
      
      if (file.type === 'text/plain') {
        resumeText = await extractTextFromFile(file);
      } else {
        // For Word documents and PDFs, we'll use a simple approach
        // In a real app, you'd want to use libraries like mammoth.js for Word docs
        resumeText = `Resume uploaded: ${file.name}\n\n[Content would be extracted here in production]`;
      }

      const response = await fetch('/api/resume-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resumeText }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const parsedFeedback = parseFeedback(data.feedback);
      setFeedback(parsedFeedback);
    } catch (error) {
      console.error('Error processing file:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      alert(`Error processing file: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
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
            <div 
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragOver 
                  ? 'border-blue-500 bg-blue-900/20' 
                  : 'border-gray-600 hover:border-gray-500'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                  <p className="text-gray-400">Analyzing your resume...</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="mb-4 text-gray-400">
                    {uploadedFileName ? `Uploaded: ${uploadedFileName}` : 'Drag and drop your resume here, or click to upload.'}
                  </p>
                  <p className="mb-4 text-xs text-gray-500">Supports .doc, .docx, .pdf, .txt files</p>
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept=".doc,.docx,.pdf,.txt"
                    className="hidden" 
                  />
                  <button 
                    onClick={handleUploadClick}
                    className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    {uploadedFileName ? 'Upload New File' : 'Upload Resume'}
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
        <div className="col-span-2 flex flex-col gap-8">
          <section className="bg-neutral-950 rounded-lg p-8 outline outline-neutral-800">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
              <h2 className="text-xl font-medium">Resume Feedback</h2>
              {feedback.length > 0 && (
                <span className="text-sm text-green-400 bg-green-900/20 px-3 py-1 rounded-full">
                  {feedback.length} suggestions generated
                </span>
              )}
            </div>
            
            {feedback.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 mb-2">No feedback yet</p>
                <p className="text-sm text-gray-500">Upload your resume to get personalized feedback for CS internships</p>
              </div>
            ) : (
              <div className="space-y-6">
                {feedback.map((item, index) => (
                  <div key={item.id} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="text-lg font-medium mb-2">{index + 1}. {item.suggestion}</h3>
                    <p className="text-sm text-gray-400 mb-1"><strong>Impact:</strong> {item.impact}</p>
                    <p className="text-sm text-gray-400"><strong>Action:</strong> {item.action}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <footer className="mt-12 w-full text-center text-gray-500 text-sm">
        © 2025 Internship Tracker. All rights reserved.
      </footer>
    </div>
  );
}

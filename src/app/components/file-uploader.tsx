"use client";
import { useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setError(null);

    if (!selectedFile) return;

    // Check if file is a PDF
    if (selectedFile.type !== "application/pdf") {
      setError("Please select a PDF file");
      setFile(null);
      return;
    }

    setFile(selectedFile);
  };

  const processPDF = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    await fetch("/api/process-pdf", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to process PDF");
        }
        return response.json();
      })
      .then((data) => {
        console.log("PDF processed successfully:", data);
        // Handle the response data as needed
      })
      .catch((error) => {
        console.error("Error processing PDF:", error);
        setError("Failed to process PDF");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">PDF to MCQ Generator</h1>
        
        <div className="mb-4">
          <label 
            htmlFor="file-upload" 
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">PDF files only</p>
            </div>
            <input 
              id="file-upload" 
              type="file" 
              accept=".pdf,application/pdf" 
              className="hidden" 
              onChange={handleFileChange}
            />
          </label>
        </div>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        
        {file && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-gray-900 font-medium">Selected file:</p>
            <p className="text-sm text-gray-700 truncate">{file.name}</p>
            <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
        )}
        
        {file && (
          <button 
            onClick={processPDF}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Process PDF
          </button>
        )}
      </div>
    </div>
  );
}
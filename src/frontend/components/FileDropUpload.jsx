import { useState } from 'react';

export default function FileDropUpload({ onSuccess }) {
  const [dragOver, setDragOver] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (!file || file.type !== 'application/pdf') {
      alert("Please upload a PDF file.");
      return;
    } 

    setGenerating(true);
    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = import.meta.env.VITE_API_URL;
    const res = await fetch(`${apiUrl}/quiz`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    onSuccess(data.steps);
    setGenerating(false);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`border-2 border-dashed rounded-xl p-8 text-center transition ${dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
    >
      <p className="text-gray-600">
        {generating ? "Generating... (May take a few seconds)"
          : "Drag & drop a PDF lesson file here"}
      </p>
    </div>
  );
}

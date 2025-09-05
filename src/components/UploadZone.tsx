import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, Check } from "lucide-react";

const UploadZone = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = () => {
    // Simulate file upload
    const newFiles = [
      "Neural Networks Research.pdf",
      "Machine Learning Notes.txt",
      "AI Ethics Discussion.docx"
    ];
    setUploadedFiles(prev => [...prev, ...newFiles.slice(0, 3 - prev.length)]);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-neural-node bg-neural-node/10'
            : 'border-neural-connection/30 hover:border-neural-node/60'
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFileUpload();
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Upload Your Knowledge
            </h3>
            <p className="text-gray-400 mb-4">
              Drag & drop files here, or click to browse
            </p>
            <p className="text-sm text-gray-500">
              Supports: PDF, TXT, DOCX, MD files
            </p>
          </div>

          <Button
            variant="neural"
            onClick={handleFileUpload}
            className="px-8"
          >
            Choose Files
          </Button>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-white">Uploaded Files</h4>
          
          {uploadedFiles.map((fileName, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg"
            >
              <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
                {fileName.endsWith('.pdf') ? (
                  <FileText className="w-5 h-5 text-white" />
                ) : (
                  <File className="w-5 h-5 text-white" />
                )}
              </div>
              
              <div className="flex-1">
                <p className="text-white font-medium">{fileName}</p>
                <p className="text-sm text-gray-400">Processing complete</p>
              </div>
              
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UploadZone;
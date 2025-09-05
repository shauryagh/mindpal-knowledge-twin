import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, FileText, File, Check } from "lucide-react";

const UploadZone = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (files?: FileList) => {
    setIsProcessing(true);
    
    // Simulate file processing
    setTimeout(() => {
      const newFiles = files 
        ? Array.from(files).map(file => file.name)
        : [
            "Neural Networks Research.pdf",
            "Machine Learning Notes.txt", 
            "AI Ethics Discussion.docx"
          ];
      
      setUploadedFiles(prev => {
        const combined = [...prev, ...newFiles];
        return combined.slice(0, 5); // Limit to 5 files for demo
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
          isDragging
            ? 'border-neural-node bg-neural-node/10 scale-105'
            : 'border-neural-connection/30 hover:border-neural-node/60'
        } ${isProcessing ? 'opacity-50' : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          const files = e.dataTransfer.files;
          if (files.length > 0) {
            handleFileUpload(files);
          }
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-white" />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {isProcessing ? 'Processing Files...' : 'Upload Your Knowledge'}
            </h3>
            <p className="text-gray-400 mb-4">
              {isProcessing 
                ? 'AI is analyzing your documents and extracting key concepts...'
                : 'Drag & drop files here, or click to browse'
              }
            </p>
            <p className="text-sm text-gray-500">
              Supports: PDF, TXT, DOCX, MD files
            </p>
          </div>

          <input
            type="file"
            id="file-upload"
            className="hidden"
            multiple
            accept=".pdf,.txt,.docx,.md"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleFileUpload(e.target.files);
              }
            }}
          />
          <Button
            variant="neural"
            onClick={() => document.getElementById('file-upload')?.click()}
            disabled={isProcessing}
            className="px-8"
          >
            {isProcessing ? 'Processing...' : 'Choose Files'}
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
              className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg animate-fade-in hover:bg-white/20 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
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
                <p className="text-sm text-gray-400">
                  {isProcessing && index === uploadedFiles.length - 1 
                    ? 'Processing...' 
                    : 'Processing complete'
                  }
                </p>
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
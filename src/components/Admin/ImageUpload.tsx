import React, { useState, useRef } from 'react';
import { authApi } from '../../services/portfolioApi';

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  currentUrl?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess, currentUrl }) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const token = localStorage.getItem('admin_token');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api'}/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      onUploadSuccess(data.url);
    } catch (err) {
      setError('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-secondary mb-2">Upload Image</label>
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive ? 'border-primary bg-primary/5' : 'border-border'
        } ${uploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer hover:border-primary'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={uploading}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-secondary">Uploading & compressing...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <svg className="w-12 h-12 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-sm text-primary font-medium">Click or drag image here</p>
            <p className="text-xs text-secondary">Max 10MB • Auto-compressed to WebP</p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2">{error}</p>
      )}

      {currentUrl && (
        <div className="mt-2 text-xs text-secondary">
          Current: <span className="text-primary">{currentUrl.split('/').pop()}</span>
        </div>
      )}
    </div>
  );
};

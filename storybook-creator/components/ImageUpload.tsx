'use client';

import { useState, useRef } from 'react';
import { UploadedImage } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader2, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ImageUploadProps {
  onImagesChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  onBack: () => void;
  onContinue: () => void;
}

export function ImageUpload({
  onImagesChange,
  maxImages = 10,
  onBack,
  onContinue,
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [processing, setProcessing] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.currentTarget.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      if (images.length >= maxImages) break;

      const file = files[i];
      const id = `${Date.now()}-${i}`;

      // Create preview
      const reader = new FileReader();
      reader.onload = async (event) => {
        const preview = event.target?.result as string;
        const newImage: UploadedImage = {
          id,
          file,
          preview,
        };

        setImages((prev) => [...prev, newImage]);

        // Process image to line drawing
        processImage(id, file);
      };
      reader.readAsDataURL(file);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processImage = async (id: string, file: File) => {
    setProcessing((prev) => ({ ...prev, [id]: true }));
    setErrors((prev) => ({ ...prev, [id]: '' }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/process-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process image');
      }

      const data = await response.json();

      setImages((prev) =>
        prev.map((img) =>
          img.id === id ? { ...img, lineDrawing: data.imageUrl } : img
        )
      );
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [id]: error instanceof Error ? error.message : 'Failed to process',
      }));
    } finally {
      setProcessing((prev) => ({ ...prev, [id]: false }));
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    setProcessing((prev) => {
      const newProcessing = { ...prev };
      delete newProcessing[id];
      return newProcessing;
    });
  };

  const handleContinue = () => {
    onImagesChange(images);
    onContinue();
  };

  const processedCount = images.filter((img) => img.lineDrawing).length;
  const allProcessed = processedCount === images.length && images.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Pictures ({images.length}/{maxImages})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed rounded-lg p-8 text-center">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={images.length >= maxImages}
          >
            Choose Images
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Drag and drop images here or click to select
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image) => (
            <div key={image.id} className="relative">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                {image.lineDrawing ? (
                  <img
                    src={image.lineDrawing}
                    alt="Line drawing"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={image.preview}
                    alt="Original"
                    className="w-full h-full object-cover opacity-50"
                  />
                )}
              </div>

              {processing[image.id] && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </div>
              )}

              {image.lineDrawing && !processing[image.id] && (
                <div className="absolute top-2 right-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              )}

              {errors[image.id] && (
                <div className="absolute top-2 right-2">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
              )}

              <button
                onClick={() => removeImage(image.id)}
                className="absolute bottom-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {errors[image.id] && (
                <p className="text-xs text-red-500 mt-1">{errors[image.id]}</p>
              )}
            </div>
          ))}
        </div>

        {images.length > 0 && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {processedCount} of {images.length} images processed
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-4 pt-6">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!allProcessed || images.length === 0}
            className="flex-1"
          >
            Continue to Preview
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

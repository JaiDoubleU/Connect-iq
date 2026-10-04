'use client';

import { useState } from 'react';
import { storylines, getStoryline } from '@/lib/storylines';
import { UploadedImage, BookState, PageData } from '@/lib/types';
import { StorylineSelector } from '@/components/StorylineSelector';
import { StorylineForm } from '@/components/StorylineForm';
import { ImageUpload } from '@/components/ImageUpload';
import { BookPreview } from '@/components/BookPreview';

type Step = 'storyline-select' | 'storyline-form' | 'image-upload' | 'book-preview';

export default function Home() {
  const [step, setStep] = useState<Step>('storyline-select');
  const [bookState, setBookState] = useState<BookState>({
    title: 'My Story Book',
    storylineId: '',
    storylineValues: {},
    images: [],
    pages: [],
  });

  const handleStorylineSelect = (storylineId: string) => {
    setBookState((prev) => ({ ...prev, storylineId }));
    setStep('storyline-form');
  };

  const handleStorylineSubmit = (values: Record<string, string>) => {
    setBookState((prev) => ({ ...prev, storylineValues: values }));
    setStep('image-upload');
  };

  const handleImagesChange = (images: UploadedImage[]) => {
    const storyline = getStoryline(bookState.storylineId);
    if (!storyline) return;

    // Generate page texts from storyline
    const pageTexts = storyline.generatePages(bookState.storylineValues);

    // Create pages by pairing images with texts
    const pages: PageData[] = [];
    for (let i = 0; i < 10; i++) {
      pages.push({
        imageUrl: images[i % images.length]?.lineDrawing || '',
        text: pageTexts[i] || '',
      });
    }

    setBookState((prev) => ({
      ...prev,
      images,
      pages,
    }));
  };

  const handleContinueFromImages = () => {
    setStep('book-preview');
  };

  const handleBack = () => {
    switch (step) {
      case 'storyline-form':
        setStep('storyline-select');
        break;
      case 'image-upload':
        setStep('storyline-form');
        break;
      case 'book-preview':
        setStep('image-upload');
        break;
    }
  };

  const currentStoryline =
    step !== 'storyline-select'
      ? getStoryline(bookState.storylineId)
      : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            📚 Custom Story Book Creator
          </h1>
          <p className="text-lg text-slate-600">
            Turn your pictures into a beautiful children's book
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm">
            <div
              className={`flex flex-col items-center ${
                step === 'storyline-select'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-2">
                1
              </div>
              <span className="text-xs">Story</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                ['storyline-form', 'image-upload', 'book-preview'].includes(
                  step
                )
                  ? 'bg-indigo-300'
                  : 'bg-gray-300'
              }`}
            />
            <div
              className={`flex flex-col items-center ${
                step === 'storyline-form' || step === 'image-upload' || step === 'book-preview'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-2">
                2
              </div>
              <span className="text-xs">Details</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                ['image-upload', 'book-preview'].includes(step)
                  ? 'bg-indigo-300'
                  : 'bg-gray-300'
              }`}
            />
            <div
              className={`flex flex-col items-center ${
                step === 'image-upload' || step === 'book-preview'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-2">
                3
              </div>
              <span className="text-xs">Images</span>
            </div>
            <div
              className={`flex-1 h-1 mx-2 ${
                step === 'book-preview'
                  ? 'bg-indigo-300'
                  : 'bg-gray-300'
              }`}
            />
            <div
              className={`flex flex-col items-center ${
                step === 'book-preview'
                  ? 'text-indigo-600 font-semibold'
                  : 'text-slate-500'
              }`}
            >
              <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center mb-2">
                4
              </div>
              <span className="text-xs">Preview</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {step === 'storyline-select' && (
            <StorylineSelector
              storylines={storylines}
              onSelect={handleStorylineSelect}
            />
          )}

          {step === 'storyline-form' && currentStoryline && (
            <StorylineForm
              storyline={currentStoryline}
              onSubmit={handleStorylineSubmit}
              onBack={handleBack}
            />
          )}

          {step === 'image-upload' && (
            <ImageUpload
              maxImages={10}
              onImagesChange={handleImagesChange}
              onBack={handleBack}
              onContinue={handleContinueFromImages}
            />
          )}

          {step === 'book-preview' && (
            <BookPreview
              title={bookState.title}
              pages={bookState.pages}
              onBack={handleBack}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-slate-600 text-sm">
          <p>
            Create a magical 10-page board book featuring your own pictures
          </p>
        </div>
      </div>
    </main>
  );
}

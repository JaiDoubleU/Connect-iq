'use client';

import { useState } from 'react';
import { PageData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Download } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BookPreviewProps {
  title: string;
  pages: PageData[];
  onBack: () => void;
}

export function BookPreview({ title, pages, onBack }: BookPreviewProps) {
  const [bookTitle, setBookTitle] = useState(title || 'My Story Book');
  const [generating, setGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    setGenerating(true);
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: bookTitle,
          pages,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${bookTitle}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to download PDF');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div>
            <Label htmlFor="bookTitle">Book Title</Label>
            <Input
              id="bookTitle"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="mt-2"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {pages.map((page, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                    {page.imageUrl && (
                      <img
                        src={page.imageUrl}
                        alt={`Page ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">
                    Page {index + 1}
                  </h3>
                  <p className="text-gray-700">{page.text}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-4 pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          onClick={handleDownloadPDF}
          disabled={generating}
          className="flex-1 gap-2"
        >
          {generating && <Loader2 className="w-4 h-4 animate-spin" />}
          {generating ? 'Generating PDF...' : 'Download PDF'}
        </Button>
      </div>
    </div>
  );
}

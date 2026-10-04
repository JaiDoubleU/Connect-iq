'use client';

import { useState } from 'react';
import { Storyline } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StorylineFormProps {
  storyline: Storyline;
  onSubmit: (values: Record<string, string>) => void;
  onBack: () => void;
}

export function StorylineForm({
  storyline,
  onSubmit,
  onBack,
}: StorylineFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  const isComplete = storyline.fields.every((field) => values[field.id]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{storyline.title} - Story Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {storyline.fields.map((field) => (
            <div key={field.id}>
              <Label htmlFor={field.id}>{field.label}</Label>
              {field.type === 'textarea' ? (
                <Textarea
                  id={field.id}
                  placeholder={field.placeholder}
                  value={values[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-2"
                />
              ) : field.type === 'select' ? (
                <Select
                  value={values[field.id] || ''}
                  onValueChange={(value) => handleChange(field.id, value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id={field.id}
                  placeholder={field.placeholder}
                  value={values[field.id] || ''}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="mt-2"
                />
              )}
            </div>
          ))}

          <div className="flex gap-4 pt-6">
            <Button type="button" variant="outline" onClick={onBack}>
              Back
            </Button>
            <Button type="submit" disabled={!isComplete} className="flex-1">
              Continue
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

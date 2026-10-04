'use client';

import { Storyline } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface StorylineSelectorProps {
  storylines: Storyline[];
  onSelect: (storylineId: string) => void;
}

export function StorylineSelector({
  storylines,
  onSelect,
}: StorylineSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {storylines.map((storyline) => (
        <Card
          key={storyline.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <CardHeader>
            <CardTitle className="text-lg">{storyline.title}</CardTitle>
            <CardDescription>{storyline.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => onSelect(storyline.id)}
              className="w-full"
            >
              Choose Story
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

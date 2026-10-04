import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    const buffer = await file.arrayBuffer();

    // Convert to line drawing using edge detection
    const processedBuffer = await sharp(buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .grayscale()
      .negate()
      .convolve({
        kernel: [-1, -1, -1, -1, 8, -1, -1, -1, -1],
        scale: 1,
        offset: 0,
        width: 3,
        height: 3,
      })
      .normalize()
      .toBuffer();

    // Convert to base64
    const base64 = processedBuffer.toString('base64');
    const dataUrl = `data:image/png;base64,${base64}`;

    return NextResponse.json({ imageUrl: dataUrl });
  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}

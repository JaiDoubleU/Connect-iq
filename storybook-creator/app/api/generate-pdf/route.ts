import { NextRequest, NextResponse } from 'next/server';
import jsPDF from 'jspdf';

interface PageData {
  imageUrl: string;
  text: string;
}

interface BookData {
  title: string;
  pages: PageData[];
}

export async function POST(request: NextRequest) {
  try {
    const body: BookData = await request.json();

    if (!body.pages || body.pages.length === 0) {
      return NextResponse.json(
        { error: 'No pages provided' },
        { status: 400 }
      );
    }

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'in',
      format: 'letter',
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < body.pages.length; i++) {
      if (i > 0) {
        pdf.addPage();
      }

      const page = body.pages[i];

      // Add image
      if (page.imageUrl) {
        const imgX = 0.5;
        const imgY = 0.5;
        const imgWidth = pageWidth - 1;
        const imgHeight = pageHeight - 1.5;

        pdf.addImage(
          page.imageUrl,
          'PNG',
          imgX,
          imgY,
          imgWidth,
          imgHeight
        );
      }

      // Add text
      if (page.text) {
        const textY = pageHeight - 0.8;
        pdf.setFontSize(12);
        pdf.text(page.text, 0.5, textY, { maxWidth: pageWidth - 1 });
      }
    }

    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${body.title || 'storybook'}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}

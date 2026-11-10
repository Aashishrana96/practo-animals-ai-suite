import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

/**
 * Exports a specific DOM element as a high-resolution PNG
 */
export async function exportElementAsPng(element: HTMLElement, filename: string): Promise<boolean> {
  try {
    const dataUrl = await toPng(element, {
      pixelRatio: 2, // 2x crisp retina export
      quality: 0.95,
      cacheBust: true,
    });
    
    const link = document.createElement('a');
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
    return true;
  } catch (err) {
    console.error('Failed to export element to PNG:', err);
    return false;
  }
}

/**
 * Exports a sequence of slide elements as a unified multi-page PDF (1080x1350 aspect ratio)
 */
export async function exportSlidesToPdf(
  elements: HTMLElement[],
  filename: string,
  onProgress?: (current: number, total: number) => void
): Promise<boolean> {
  try {
    // 1080x1350 aspect ratio -> 4:5 in mm = 108mm x 135mm or 216mm x 270mm
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [108, 135]
    });

    for (let i = 0; i < elements.length; i++) {
      if (onProgress) onProgress(i + 1, elements.length);
      const el = elements[i];
      const dataUrl = await toPng(el, {
        pixelRatio: 2,
        quality: 0.95,
        cacheBust: true
      });

      if (i > 0) {
        pdf.addPage([108, 135], 'portrait');
      }

      pdf.addImage(dataUrl, 'PNG', 0, 0, 108, 135);
    }

    pdf.save(`${filename}.pdf`);
    return true;
  } catch (err) {
    console.error('Failed to export slides to PDF:', err);
    return false;
  }
}


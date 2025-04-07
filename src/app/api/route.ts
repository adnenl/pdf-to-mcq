import { NextRequest, NextResponse } from "next/server";
import * as pdfjs from "pdfjs-dist";
import { extractAndChunkPdf } from "../utils/pdfUtils";

export async function POST(req: NextRequest) {
  try {
    // Get the uploaded PDF
    const formData = await req.formData();
    const pdfFile = formData.get('file') as File;

    if (!pdfFile) {
      return NextResponse.json({ error: 'No PDF file provided' }, { status: 400 });
    }

    // Extract text using pdf-lib
    const pdfBuffer = await Buffer.from(await pdfFile.arrayBuffer());
    
    const chunks = await extractAndChunkPdf(pdfBuffer);

    console.log("Extracted chunks:", chunks);
    
    // Send to worker
    const workerResponse = await fetch('https://pdf-to-mcq.adnenl.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chunks: chunks}),
    });
    
    // Handle response
    if (!workerResponse.ok) {
      const errorText = await workerResponse.text();
      return NextResponse.json({ error: `Worker error: ${errorText}` }, { status: 500 });
    }
    
    const result = await workerResponse.json();
    return NextResponse.json(result);
  } catch (err) {
    console.error("PDF processing error:", err);
    return NextResponse.json({ 
      error: err instanceof Error ? err.message : 'Failed to process PDF' 
    }, { status: 500 });
  }
}




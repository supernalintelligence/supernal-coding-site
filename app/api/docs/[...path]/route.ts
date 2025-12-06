import fs from 'node:fs';
import path from 'node:path';
import { type NextRequest, NextResponse } from 'next/server';
import { getContentDirectory } from '@/lib/content/filesystem';
import { logger } from '@/lib/logger';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    // Get the content directory
    const contentDir = getContentDirectory();

    // Await and validate params
    const resolvedParams = await params;
    if (!resolvedParams?.path) {
      return new NextResponse('Path parameter is required', { status: 400 });
    }

    // Access path from resolved params
    const pathSegments = resolvedParams.path;

    // Construct the file path
    const filePath = path.join(contentDir, ...pathSegments);
    logger.info(`API Request - Looking for file: ${filePath}`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      logger.error(`API Request - File not found: ${filePath}`);

      // Try to handle case sensitivity issues
      const dirPath = path.join(contentDir, ...pathSegments.slice(0, -1));
      const fileName = pathSegments[pathSegments.length - 1];

      if (fs.existsSync(dirPath)) {
        try {
          const files = fs.readdirSync(dirPath);
          const matchingFile = files.find(
            (file) => file.toLowerCase() === fileName.toLowerCase()
          );
          if (matchingFile) {
            const caseSensitivePath = path.join(dirPath, matchingFile);
            logger.info(
              `API Request - Found case-insensitive match: ${caseSensitivePath}`
            );
            return serveFile(caseSensitivePath);
          }
        } catch (e) {
          logger.error(
            `API Request - Error reading directory: ${e instanceof Error ? e.message : String(e)}`
          );
        }
      }

      return new NextResponse(`File not found: ${filePath}`, { status: 404 });
    }

    return serveFile(filePath);
  } catch (error) {
    logger.error(
      `API Request - Error serving file: ${error instanceof Error ? error.message : String(error)}`
    );
    return new NextResponse(
      `Internal Server Error: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}

// Helper function to serve a file with the appropriate content type
function serveFile(filePath: string): NextResponse {
  try {
    // Read file
    const fileBuffer = fs.readFileSync(filePath);

    // Determine content type based on file extension
    const ext = path.extname(filePath).toLowerCase();
    let contentType = 'application/octet-stream';

    switch (ext) {
      case '.png':
        contentType = 'image/png';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.gif':
        contentType = 'image/gif';
        break;
      case '.svg':
        contentType = 'image/svg+xml';
        break;
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.webp':
        contentType = 'image/webp';
        break;
      case '.ico':
        contentType = 'image/x-icon';
        break;
      // Add more content types as needed
    }

    // Return file with appropriate content type
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
  } catch (error) {
    logger.error(
      `API Request - Error in serveFile: ${error instanceof Error ? error.message : String(error)}`
    );
    return new NextResponse(
      `Error serving file: ${error instanceof Error ? error.message : String(error)}`,
      { status: 500 }
    );
  }
}

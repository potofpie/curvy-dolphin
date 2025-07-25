# Handwritten Notes to Markdown Converter

A modern web application that converts handwritten notes to Markdown format using camera capture and OCR technology.





## Features

- **User Authentication** - Secure login with Clerk
- **Camera Integration** - Capture photos directly from your device
- **Image Upload** - Upload existing images of handwritten notes
- **OCR Conversion** - Convert handwritten text to Markdown (demo implementation)
- **Copy to Clipboard** - Instantly copy converted text
- **Export Options** - Placeholder for future Notion and Obsidian integration
- **Responsive Design** - Works on desktop and mobile devices

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Clerk Authentication**
   - Sign up at [Clerk.dev](https://clerk.dev)
   - Create a new application
   - Copy your publishable key to `.env.local`:
     ```
     VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
     ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

## Technical Implementation

### Authentication
- Uses Clerk for secure user authentication
- Supports email/password and social login options
- Protected routes ensure only authenticated users can access the converter

### Camera Integration
- Uses `getUserMedia()` API for camera access
- Supports both front and rear cameras
- Fallback to file upload for devices without camera access

### OCR Integration (To Be Implemented)
The current implementation uses a mock conversion. For production, integrate with:
- **Google Vision API** - Excellent accuracy for handwritten text
- **Azure Computer Vision** - Good performance with various handwriting styles
- **Amazon Textract** - Strong document processing capabilities

### Future Enhancements
- Real OCR service integration
- Export to Notion and Obsidian
- Batch processing of multiple images
- Custom Markdown formatting options
- Handwriting recognition training

## Usage

1. **Sign In** - Authenticate with your Clerk account
2. **Capture Image** - Use camera or upload existing photo
3. **Convert** - Process the image to extract text
4. **Copy/Export** - Use the converted Markdown text

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - see LICENSE file for details

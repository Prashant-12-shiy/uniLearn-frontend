import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { file } = req.body;

    try {
      // Upload to Cloudinary using file URL or base64 string
      const uploadResponse = await cloudinary.uploader.upload(file, {
        upload_preset: 'r4mupbel', // Make sure to create this preset in Cloudinary
      });
      res.status(200).json({ url: uploadResponse.secure_url });
    } catch (error) {
      console.error('Error uploading image:', error);
      res.status(500).json({ error: 'Image upload failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

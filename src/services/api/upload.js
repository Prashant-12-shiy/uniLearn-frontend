import { fetchSignature } from "./signatureApi";
import axios from "axios";

export const uploadFileToCloudinary = async (
  selectedFile,
  uploadPreset,
  cloudName,
  resourceType,
  folderPath = '',
) => {
  try {
    const { signature, api_key, timestamp } = await fetchSignature(
      uploadPreset, folderPath
    );

    // Create FormData for the Cloudinary upload
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("upload_preset", uploadPreset);
    formData.append("signature", signature); // Signed signature from the backend
    formData.append("timestamp", timestamp); // Add timestamp for signature
    formData.append("api_key", api_key); // Add API key to the request

    if (folderPath) {
        formData.append("folder", folderPath); // Specify the folder path
      }
  

    // Upload the file to Cloudinary using the signed request
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      formData
    );

    return res.data.secure_url; // Return the secure URL of the uploaded file
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

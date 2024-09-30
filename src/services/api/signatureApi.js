// services/api/signatureApi.js
import axios from 'axios';
import { ENDPOINT } from '../endPoints';

const {BASEURL} = ENDPOINT;

// Function to fetch signature from the backend
export const fetchSignature = async (uploadPreset) => {
  const timestamp = Math.floor(Date.now() / 1000); // Cloudinary expects a timestamp in seconds
  try {
    const response = await axios.post(BASEURL + '/api/generateSignature', {
      timestamp,
      upload_preset: uploadPreset, // Send the upload preset
    });
    return response.data; // This will include the signature, API key, and timestamp
  } catch (error) {
    console.error("Error fetching signature:", error.response ? error.response.data : error.message);
    throw error;
  }
};

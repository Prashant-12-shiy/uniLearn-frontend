import { uploadFileToCloudinary } from "@/services/api/upload";

export const handleSubmission = async (
  data,
  selectedFile,
  uploadPreset,
  cloudName,
  mutation,
  fileKey,
  resourceType,
  folderPath
) => {
  if (!selectedFile) {
    console.error("No file selected.");
    return;
  }

  try {
    // Upload the file to Cloudinary
    const secure_url = await uploadFileToCloudinary(
      selectedFile,
      uploadPreset,
      cloudName,
      resourceType,
      folderPath
    );

    // Create updated data object with the uploaded file URL
    const updatedData = {
      ...data,
      [fileKey]: secure_url, // Dynamically set the key for the uploaded file URL
    };

    // Call the respective mutation to add the data
    mutation(updatedData);

    reset(); // Reset the form
  } catch (error) {
    console.error("Error handling submission:", error);
  } 
};

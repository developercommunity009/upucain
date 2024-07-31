import { BACKEND_URL } from "../constant";

export const handleAwsUpload = async (file) => {
    const customFileName = new Date().getTime().toString();
    const originalFileName = file.name;

    // Extract the file extension from the original filename
    const fileExtension = originalFileName.slice(((originalFileName.lastIndexOf(".") - 1) >>> 0) + 2);

    // Create a new filename with the timestamp and original extension
    const newFileName = `${originalFileName.replace(`.${fileExtension}`, '')}_${customFileName}.${fileExtension}`;

    const response = await fetch(`${BACKEND_URL}/api/aws/url?filename=${newFileName}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });

    // Check if the response is successful
    if (!response.ok) {
        console.log(`HTTP error! Status: ${response.status}`);
        return
    }

    // Parse the response to JSON
    const { url } = await response.json();

    // Fetch using PUT with Fetch API
    const putRes = await fetch(url, {
        method: 'PUT',
        body: file,
        headers: { "Content-Type": "multipart/form-data" },
    });

    const imageUrl = putRes.url.split('?')[0];

    return {
        imageUrl
    };
}


export const handleCloudnaryUpload = async(file ,userId )=>{
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('image', file);
  
    const response = await fetch(`${BACKEND_URL}/api/v1/users/uploadimage`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
  
    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || 'Upload failed');
    }
    localStorage.setItem('authUser', JSON.stringify(data.user));
  
    return { imageUrl: data.imageUrl, publicId: data.publicId };
  };
  




export const handleDownload = async (url) => {
    try {
        window.location.href = url;
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};
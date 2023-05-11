import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Create cloudinary Storage
const storage = new CloudinaryStorage({
  // cloudinary version
  cloudinary: cloudinary,
  // config our storage
  params: {
    folder: 'olympics-db',
    allowedFormats: ['jpg', 'jpge', 'png', 'webp', 'gif']
  }
});

// Function to act as a middleware
export const upload = multer({ storage });

// Function to delete Cloudinary images when an entry in db is deleted
export const deleteImg = (imgURL) => {
  // Divide URL to get the img id using "/" as a reference
  const imgSplitted = imgURL.split('/');
  // We obtain our file id with file extension.
  const nameSplitted = imgSplitted[imgSplitted.length - 1].split('.');
  // Obtain the folder
  const folderSplitted = imgSplitted[imgSplitted.length - 2];
  // Create public id with the folder name and file name without extension
  const public_id = `${folderSplitted}/${nameSplitted[0]}`;
  cloudinary.uploader.destroy(public_id);
};

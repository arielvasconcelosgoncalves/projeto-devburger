import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "devburger", // nome da pasta no Cloudinary
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

export default multer({ storage });
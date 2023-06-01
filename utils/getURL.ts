import { storage } from "@/appwrite";

export const getURL = async (image: Image) => {
  return storage.getFilePreview(image.buckedId, image.fileId);
};

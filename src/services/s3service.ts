// src/services/s3Service.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize the S3 client
const s3Client = new S3Client({
  region: import.meta.env.VITE_AWS_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
  },
});

const bucketName = import.meta.env.VITE_AWS_BUCKET_NAME;

/**
 * Upload file to S3
 * @param key - The key to upload the file to eg. "images/uploads/file.jpg"
 * @param uint8Array - The file to upload
 * @param type - The MIME type of the file eg. "image/jpeg"
 * @returns The URL of the uploaded file
 */

export const uploadToS3 = async (
  key: string,
  uint8Array: Uint8Array,
  type: string
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: uint8Array,
    ContentType: type,
  });

  await s3Client.send(command);

  // Return the URL to the uploaded file
  return `https://${bucketName}.s3.${
    import.meta.env.VITE_AWS_REGION
  }.amazonaws.com/${key}`;
};

// Get a presigned URL for temporary access to a file
export const getPresignedUrl = async (
  key: string,
  expiresIn = 3600
): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  return getSignedUrl(s3Client, command, { expiresIn });
};

// Delete a file from S3
export const deleteFile = async (key: string): Promise<void> => {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  await s3Client.send(command);
};

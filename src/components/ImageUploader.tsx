// src/components/ImageUploader.tsx
import { useState } from "react";
import { uploadFile } from "../services/s3service";

interface ImageUploaderProps {
  folder?: string;
}

const ImageUploader = ({ folder }: ImageUploaderProps = {}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Create a preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setUploading(true);
      setError(null);

      // Create a unique file name (you might want to use UUID or similar)
      const fileName = `${Date.now()}-${file.name.replace(/\s/g, "_")}`;

      // Upload the file
      const url = await uploadFile(file, fileName, folder);

      setImageUrl(url);
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="image-uploader">
      <h2>Upload Image</h2>
      {folder && <p className="folder-info">Uploading to: {folder}</p>}

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {preview && (
        <div className="preview">
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ maxWidth: "300px" }} />
        </div>
      )}

      <button onClick={handleUpload} disabled={!file || uploading}>
        {uploading ? "Uploading..." : "Upload to S3"}
      </button>

      {error && <p className="error">{error}</p>}

      {imageUrl && (
        <div className="result">
          <h3>Uploaded Successfully!</h3>
          <p>Image URL: {imageUrl}</p>
          <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

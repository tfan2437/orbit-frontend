export const saveImageFromBase64 = async (
  imageData: string,
  mimeType: string
) => {
  // Create a Blob from the base64 data
  const byteCharacters = atob(imageData);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: mimeType });

  // Create a download link and trigger it
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  // Set default filename based on mime type
  const extension = mimeType.split("/")[1] || "png";
  a.download = `Orbit_AI_Image.${extension}`;
  a.href = url;

  document.body.appendChild(a);
  a.click();

  // Clean up
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

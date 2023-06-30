async function ImageToBase64(file) {
  if (!(file instanceof File || file instanceof Blob)) {
    throw new Error("Invalid file object");
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  const data = await new Promise((resolve, reject) => {
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
  return data;
}

export default ImageToBase64;

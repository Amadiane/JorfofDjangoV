export default function getCroppedImg(imageSrc, crop, zoom, aspect) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const naturalWidth = image.width;
      const naturalHeight = image.height;

      const cropX = (crop.x * naturalWidth) / zoom;
      const cropY = (crop.y * naturalHeight) / zoom;
      const cropWidth = naturalWidth / zoom;
      const cropHeight = naturalHeight / zoom;

      canvas.width = cropWidth;
      canvas.height = cropHeight;

      ctx.drawImage(
        image,
        cropX,
        cropY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      canvas.toBlob((blob) => {
        resolve(blob);
      }, "image/jpeg");
    };
  });
}

export const convertImageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      // The file's text will be printed here
      const result = reader.result as string;

      const img = new Image();
      img.src = result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxWidth = 40; // Largeur maximale souhaitée
        const maxHeight = 40; // Hauteur maximale souhaitée
        let width = img.width;
        let height = img.height;

        // Calculer les nouvelles dimensions
        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Impossible de récupérer le contexte 2D du canvas");
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/png", 0.95));
        // canvas.toBlob(
        //   (blob) => {
        //     if (!blob) {
        //       reject("Impossible de récupérer le blob");
        //       return;
        //     }
        //     resolve(URL.createObjectURL(blob));
        //   },
        //   "image/jpeg",
        //   0.95
        // );
      };
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

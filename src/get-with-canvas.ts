export function getImageDataWithCanvas(file: Blob): Promise<ImageData> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            URL.revokeObjectURL(img.src);
            const canvas = new OffscreenCanvas(img.width, img.height);
            const context = canvas.getContext("2d");
            if (!context) {
                reject(new Error("OffscreenCanvas context is null"));
                return;
            }
            context.drawImage(img, 0, 0);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        };
        img.onerror = () => {
            URL.revokeObjectURL(img.src);
            reject(new Error("Failed to load image"));
        };
    });
}

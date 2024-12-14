export function getImageDataWithCanvas(file: Blob): Promise<ImageData> {
    return new Promise(async (resolve, reject) => {
        try {
            const bitmap = await createImageBitmap(file);
            const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
            const context = canvas.getContext("2d");
            if (!context) {
                reject(new Error("OffscreenCanvas context is null"));
                return;
            }
            context.drawImage(bitmap, 0, 0);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        } catch (e) {
            reject(new Error("Failed to load image"));
        }
    });
}

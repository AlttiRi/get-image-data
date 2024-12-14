export function getImageDataWithCanvas(file) {
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

export function getImageDataWithCanvasByWorker(file, workerFile = "get-image-data-worker.js") {
    return new Promise((resolve, reject) => {
        const worker = new Worker(workerFile, {type: "module"});
        worker.onmessage = (event) => {
            if (event.data.error) {
                reject(new Error(event.data.error));
            } else {
                resolve(event.data.imageData);
            }
        };
        worker.onerror = (error) => {
            reject(new Error(`Worker error: ${error.message}`));
        };
        worker.postMessage(file);
    });
}

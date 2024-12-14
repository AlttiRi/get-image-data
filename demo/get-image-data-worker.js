import {getImageDataWithCanvas} from "./get-image-data.js";

self.onmessage = async (event) => {
    const file = event.data;
    try {
        /** @type {ImageData} */
        const imageData = await getImageDataWithCanvas(file);
        self.postMessage({imageData}, {
            transfer: [imageData.data.buffer]
        });
    } catch (e) {
        self.postMessage({error: e.message});
    }
};

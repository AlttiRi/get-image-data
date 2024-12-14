import sharp from "sharp";
import {ImageDataLike} from "./types.js";


let sharpCache: typeof sharp;
export async function getImageDataWithSharp(imagePath: string): Promise<ImageDataLike> {
    if (!sharpCache) {
        const sharpModule = await import("sharp");
        sharpCache = sharpModule.default;
    }
    const sharp = sharpCache;
    const imageData = await sharp(imagePath)
        .ensureAlpha()
        .raw()
        .toBuffer({resolveWithObject: true});
    const {data, info} = imageData;
    return {
        width: info.width,
        height: info.height,
        data: new Uint8ClampedArray(data),
        colorSpace: "srgb",
    };
}

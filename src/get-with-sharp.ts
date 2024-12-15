import path from "node:path";
import sharp from "sharp";
import {ImageDataLike} from "./types.js";


let sharpCache: typeof sharp;
export async function getImageDataWithSharp(inputData: string | ArrayBufferLike, longPathFix = true): Promise<ImageDataLike> {
    if (!sharpCache) {
        const sharpModule = await import("sharp");
        sharpCache = sharpModule.default;
    }
    if (longPathFix && typeof inputData === "string") {
        inputData = path.toNamespacedPath(inputData);
    }
    const sharp = sharpCache;
    const imageData = await sharp(inputData)
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

import type { LocalImageService } from "astro";
import fs from "node:fs";

import sharpService from "astro/assets/services/sharp";

function toBase64(buffer: Uint8Array<ArrayBufferLike>) {
    return Buffer.from(buffer).toString("base64");
}

const mime = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    tiff: "image/tiff",
    webp: "image/webp",
    gif: "image/gif",
    svg: "image/svg+xml",
    avif: "image/avif"
}


let transformedAddStaticImage = false

const service: LocalImageService = Object.assign({}, sharpService, <LocalImageService>{
    async transform(buffer, options, imageConfig) {
        return {
            data: buffer,
            format: options.format ?? 'jpeg',
        };
    },
    validateOptions(options, imageConfig) {
        // * https://github.com/withastro/astro/blob/main/packages/astro/src/assets/internal.ts#L191
        const addStaticImage = globalThis.astroAsset.addStaticImage
        if (addStaticImage && !transformedAddStaticImage) {
            globalThis.astroAsset.addStaticImage = (option, propsToHash, originalFilePath) => {
                const uri = addStaticImage(option, propsToHash, originalFilePath)
                if (originalFilePath) {
                    const buf = fs.readFileSync(originalFilePath)
                    let format: keyof typeof mime = "jpeg"
                    if (typeof option.src !== "string") format = option.src.format
                    else format = (Object.prototype.hasOwnProperty.call(mime, option.format ?? "jpeg") ? option.format : "jpeg") as keyof typeof mime
                    return `data:${mime[format]};base64,${toBase64(buf)}`
                }
                return uri
            }
            transformedAddStaticImage = true
        }
        if (sharpService.validateOptions) return sharpService.validateOptions(options, imageConfig);
        return options;
    },
})

export default service;
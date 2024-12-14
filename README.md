# get-image-data

A simple JS library to get `ImageData`.

```bash
npm i @alttiri/get-image-data
```

- In Node.js use [`getImageDataWithSharp`](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-sharp.ts) to get `ImageData` with `sharp` library. 

  _Do not forget to install [`sharp`](https://www.npmjs.com/package/sharp) (`npm i sharp`). It's not included as a dependency._

- For browsers use [`getImageDataWithCanvas`](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-canvas.ts). It uses `OffscreenCanvas` to get the `ImageData` for `File`/`Blob` input.

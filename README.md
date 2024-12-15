# get-image-data

A simple JS library to get `ImageData`.

```bash
npm i @alttiri/get-image-data
```

---

- In Node.js use [`getImageDataWithSharp`](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-sharp.ts) to get `ImageData` with `sharp` library. 

  _Do not forget to install [`sharp`](https://www.npmjs.com/package/sharp) (`npm i sharp`).
  Since `sharp` is not included as a dependency (This allows you to install the version of `sharp` you need)._


- For browsers just use [`getImageDataWithCanvas`](https://github.com/AlttiRi/get-image-data/blob/master/src/get-with-canvas.ts). 
    
  It uses `OffscreenCanvas` to get the `ImageData` for `File`/`Blob` input.

  _You can get `File` from the HTML input element, and `Blob` from `fetch` response._

---

### Node.js examples

```bash
npm i @alttiri/get-image-data sharp
```

An image path (`string`) as input:
```ts
import {getImageDataWithSharp as getImageData} from "@alttiri/get-image-data";

const imagePath = "C:/Windows/IdentityCRL/WLive48x48.png";
console.log(await getImageData(imagePath));
```

Or `ArrayBufferLike | ArrayBufferView`:
```ts
import {getImageDataWithSharp as getImageData} from "@alttiri/get-image-data";
import fs from "node:fs/promises";

const imagePath = "C:/Windows/IdentityCRL/WLive48x48.png";
const fileBuffer = await fs.readFile(imagePath);
console.log(await getImageData(fileBuffer));
```

The result:
```
{
  width: 48,
  height: 48,
  data: Uint8ClampedArray(9216) [255, 255, 255, 0, ...],
  colorSpace: "srgb"
}
```
---

### Web examples

```bash
npm i @alttiri/get-image-data
```

`File` from `HTMLInputElement`:

```js
import {getImageDataWithCanvas as getImageData} from "@alttiri/get-image-data";

const input = document.querySelector(`input[type="file"]`);
input.onchange = async function() {
  const file = input.files[0];
  console.log(await getImageData(file));
}
```

`Blob` from `fetch` response:

```ts
import {getImageDataWithCanvas as getImageData} from "@alttiri/get-image-data";

const imageUrl = "https://i.imgur.com/DR94LKg.jpeg";
const resp = await fetch(imageUrl);
const blob = await resp.blob();
console.log(await getImageData(blob));
```

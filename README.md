# node-ts-template

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/node-utedwa)

node.js + typescript template

### Dev ts runtime

- ts-node
- vite-node
- nodemon for watch mode (執行 ts 還是用 nodemon 比較方便做 watch)

也有其他 ts runtime 可做選擇 [TypeScript runtime comparisons](https://github.com/privatenumber/ts-runtime-comparison)。

### Build

- typescript cli

## Common Config

node 16 開始有比較好的 esm & cjs 兼容模式設定 `nodenext`，能以 package.json 為基準自動判斷，並且能識別附檔名 `.cjs`、`.mjs` 決定該檔案使用哪種 module 解析。

```js
// package.json
{
  "type": "module" // module | commonjs
}
```

```js
// tsconfig.json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "NodeNext",
    "moduleResolution": "nodenext"
  }
}
```

## ts-node

傳統作法，nodemon 或是 tsconfig 都默認支持。需要在 tsconfig 取消 type 檢查，不然 HMR 很慢。

```js
{
  "ts-node": {
    "esm": true, // 仍需個別設定 module 模式
    "transpileOnly": true
  }
}
```

ts-node 兼容 node cli，可利用 `--require` (`-r`) 去載入 dotenv 之類的開發依賴，就不用寫在程式裡，比較靈活。

```bash
$ ts-node -r dotenv/config ./src/app.ts

// or with nodemon
$ nodemon -r dotenv/config ./src/app.ts
```

如不使用 ts runtime 也可以用 tsc watch，但比較麻煩，速度也慢。

```bash
$ tsc --watch & nodemon ./dist/app.js
```

## vite-node

基於 vite 的 node + ts runtime。不依賴 vite 本體，可單獨運作。

- 無法兼容 node cli，例如 `--require`
- watch 有些問題，使用 nodemon 比較合適
- 速度快

## Build

tsc 編譯時不會 reset 輸出資料夾，可以用終端機指令先 remove 再編譯。

```bash
$ rm -rf ./dist && tsc

// or
$ rimraf ./dist && tsc
```

## Static files for ts

請求靜態檔案時，node server 會直接回應該檔案，無法用 ts runtime 同時讓前後端的 ts file 都運作。<br />
需要比照前後端分離的概念 public dir 只放編譯好的 js files，開發模式另起前端的 ts rumtime。

```html
<!-- NG, browser cannot read ts file -->
<script src="./main.ts">
```

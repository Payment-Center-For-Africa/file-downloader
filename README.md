# file-downloader

> File downloader for any web-based project.

[![NPM](https://img.shields.io/npm/v/@payment-center-for-africa/file-downloader.svg)](https://www.npmjs.com/package/file-downloader) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @payment-center-for-africa/file-downloader@1.0.1
```

[See Example](https://github.com/payment-center-for-africa/file-downloader/tree/master/example)

## Usage

### `downloadFileDisposition`

This function will donwload the file using the disposition header to get the file name and extension.

`function downloadFileDisposition(data: Blob, disposition: string, fallbackFileName: string): string;`

```javascript
import downloadFileDisposition from 'file-downloader';

const disposition = response.request.getResponseHeader('Content-Disposition');

if (disposition) {
  downloadFileDisposition(response.data, disposition, 'file.pdf');
} else {
  throw new Error('Content-Disposition header is missing');
}
```

### `downloadFile`

This function will donwload the file.

`function downloadFile(data: Blob, fileName: string): string;`

```javascript
import { downloadFile } from 'file-downloader';

downloadFile(blob, 'file.pdf');
```

## Built with

- TypeScript

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

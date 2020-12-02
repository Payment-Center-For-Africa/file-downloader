/**
 * Get FileName from Disposition header
 * @param disposition string
 * @param fallbackFileName string
 */
export function getFileNameDisposition(
  disposition: string,
  fallbackFileName: string,
): string {
  const fileNameRegex: RegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches: RegExpExecArray | null = fileNameRegex.exec(disposition);
  const fileName: string =
    matches !== null && matches[1]
      ? matches[1].replace(/['"]/g, '')
      : fallbackFileName;

  return fileName;
}

/**
 * Download File
 * @param data Blob
 * @param fileName string
 */
export function downloadFile(data: Blob, fileName: string): string {
  interface Responses {
    notFileName: string;
    download: string;
  }

  const responses: Responses = {
    notFileName: 'no file name provided',
    download: 'download',
  };

  if (fileName.trim() === '') return responses.notFileName;

  const blob: Blob = new Blob([data]);
  const downloadUrl: string = window.URL.createObjectURL(blob);

  const link: HTMLAnchorElement = document.createElement(
    'a',
  ) as HTMLAnchorElement;
  link.href = downloadUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  return responses.download;
}

/**
 * Download File by Disposition header
 * @param data Blob
 * @param disposition string
 * @param fallbackFileName string
 */
export default function downloadFileDisposition(
  data: Blob,
  disposition: string,
  fallbackFileName: string,
): string {
  const fileName = getFileNameDisposition(disposition, fallbackFileName);
  return downloadFile(data, fileName);
}

/**
 * download file
 * @param {String} disposition
 * @param {Blob} data
 */
export default function downloadFile(disposition, data) {
  let fileName = '';
  const fileNameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matches = fileNameRegex.exec(disposition);
  if (matches !== null && matches[1]) {
    fileName = matches[1].replace(/['"]/g, '');
  }
  const blob = new Blob([data]);
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

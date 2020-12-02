import downloadFileDisposition from '../index';

test('Download file with disposition file name', () => {
  const fileName = 'test.pdf';
  const disposition = `attachment; filename=${fileName}`;
  const fakeBlob = new Blob(['testing'], {
    type: 'application/pdf',
  });
  const anchorMocked = {
    innerHTML: '',
    href: '',
    click: jest.fn(),
    setAttribute: jest.fn(),
  };

  global.URL.createObjectURL = jest.fn(() => '');
  window.navigator.msSaveOrOpenBlob = jest.fn();
  document.body.appendChild = jest.fn();
  document.body.removeChild = jest.fn();
  document.createElement = jest.fn().mockImplementation(() => anchorMocked);

  const res = downloadFileDisposition(fakeBlob, disposition, 'file.pdf');

  expect(global.URL.createObjectURL).toBeCalledWith(fakeBlob);
  expect(anchorMocked.setAttribute).toBeCalledWith('download', fileName);
  expect(anchorMocked.click).toBeCalled();
  expect(res).toBe('download');
});

test('Download file with fallback file name', () => {
  const fallbackFileName = 'file.pdf';
  const disposition = `attachment; filename=`;
  const fakeBlob = new Blob(['testing'], {
    type: 'application/pdf',
  });
  const anchorMocked = {
    innerHTML: '',
    href: '',
    click: jest.fn(),
    setAttribute: jest.fn(),
  };

  global.URL.createObjectURL = jest.fn(() => '');
  window.navigator.msSaveOrOpenBlob = jest.fn();
  document.body.appendChild = jest.fn();
  document.body.removeChild = jest.fn();
  document.createElement = jest.fn().mockImplementation(() => anchorMocked);

  const res = downloadFileDisposition(fakeBlob, disposition, fallbackFileName);

  expect(global.URL.createObjectURL).toBeCalledWith(fakeBlob);
  expect(anchorMocked.setAttribute).toBeCalledWith(
    'download',
    fallbackFileName,
  );
  expect(anchorMocked.click).toBeCalled();
  expect(res).toBe('download');
});

test('Return no file name provided', () => {
  const fallbackFileName = '';
  const disposition = `attachment; `;
  const fakeBlob = new Blob(['testing'], {
    type: 'application/pdf',
  });
  const anchorMocked = {
    innerHTML: '',
    href: '',
    click: jest.fn(),
    setAttribute: jest.fn(),
  };

  global.URL.createObjectURL = jest.fn(() => '');
  window.navigator.msSaveOrOpenBlob = jest.fn();
  document.body.appendChild = jest.fn();
  document.body.removeChild = jest.fn();
  document.createElement = jest.fn().mockImplementation(() => anchorMocked);

  const res = downloadFileDisposition(fakeBlob, disposition, fallbackFileName);

  expect(global.URL.createObjectURL).not.toHaveBeenCalled();
  expect(anchorMocked.setAttribute).not.toHaveBeenCalled();
  expect(anchorMocked.click).not.toHaveBeenCalled();
  expect(res).toBe('no file name provided');
});

const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.get('/file', (req, res) => {
  const file = fs.createReadStream(__dirname + '/file.pdf');
  const stat = fs.statSync(__dirname + '/file.pdf');
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=file.pdf');
  res.setHeader(
    'Access-Control-Expose-Headers',
    'Content-Disposition,X-Suggested-Filename',
  );

  file.pipe(res);
});

app.listen(4000, () => console.log('Server started on port 4000'));

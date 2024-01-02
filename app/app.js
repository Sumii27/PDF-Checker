const express = require('express');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const app = express();
const port = 3000;

const getPDFVAlues = async () => {
  const PDFPath1 = './Public/PDF/1.pdf';
  const PDFPath2 = './Public/PDF/2.pdf';
  const PDF1Buffer = fs.readFileSync(PDFPath1);
  const PDF2Buffer = fs.readFileSync(PDFPath2);
  const pdfDoc1 = await PDFDocument.load(PDF1Buffer);
  const pdfDoc2 = await PDFDocument.load(PDF2Buffer);
  const pdf1pageLength = pdfDoc1.getPages().length;
  const pdf2pageLength = pdfDoc2.getPages().length;
  let pages1;
  let pages2;
  if (pdf1pageLength === pdf2pageLength) {
    for (let i = 0; i < pdf1pageLength; i++) {
      pages1 = pdfDoc1.getPages(i);
      pages2 = pdfDoc2.getPages(i);
      if (pages1.toString() == pages2.toString()) {
        return 'Files are identical';
      } else {
        return 'Files are different';
      }
    }
  } else {
    return 'Files are different';
  }
};
getPDFVAlues()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

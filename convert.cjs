const sharp = require('sharp');
sharp('public/my-photo-bordered.png')
  .webp({ quality: 80 })
  .toFile('public/my-photo-bordered.webp')
  .then(() => console.log('Successfully converted to WEBP'))
  .catch(err => console.error(err));

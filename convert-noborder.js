import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function convert() {
  const publicDir = path.join(process.cwd(), 'public');
  
  if (fs.existsSync(path.join(publicDir, 'my-photo-transparent.png'))) {
    await sharp(path.join(publicDir, 'my-photo-transparent.png'))
      .resize(646, 862, { fit: 'inside' })
      .webp({ quality: 80 })
      .toFile(path.join(publicDir, 'my-photo-noborder.webp'));
    console.log('Successfully created my-photo-noborder.webp');
  } else {
    console.log('Source file not found');
  }
}

convert().catch(console.error);

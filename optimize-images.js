import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function optimizeImages() {
  const publicDir = path.join(process.cwd(), 'public');

  try {
    // 4. about.jpeg -> about.webp
    if (fs.existsSync(path.join(publicDir, 'about.jpeg'))) {
      await sharp(path.join(publicDir, 'about.jpeg'))
        .resize(565, 753, { fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(path.join(publicDir, 'about.webp'));
      console.log('about.webp created');
    }
  } catch (e) { console.error('Error with about.jpeg', e); }

  try {
    // 5. logo.png -> logo.webp
    if (fs.existsSync(path.join(publicDir, 'logo.png'))) {
      await sharp(path.join(publicDir, 'logo.png'))
        .resize(80, null, { fit: 'inside' })
        .webp({ quality: 80 })
        .toFile(path.join(publicDir, 'logo.webp'));
      console.log('logo.webp created');
    }
  } catch (e) { console.error('Error with logo.png', e); }

  console.log('Images optimized successfully.');
}

optimizeImages().catch(console.error);

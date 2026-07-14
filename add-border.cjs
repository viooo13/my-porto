const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');

async function addBorder() {
    console.log('Loading image...');
    const img = await loadImage('public/my-photo-transparent.png');
    const border = 6; // Thickness of the white border in pixels
    const width = img.width + border * 2;
    const height = img.height + border * 2;
    
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    // Create a pure white silhouette of the image
    const tintCanvas = createCanvas(img.width, img.height);
    const tCtx = tintCanvas.getContext('2d');
    tCtx.drawImage(img, 0, 0);
    tCtx.globalCompositeOperation = 'source-in';
    tCtx.fillStyle = '#ffffff';
    tCtx.fillRect(0, 0, img.width, img.height);
    
    console.log('Drawing white border (this may take a second)...');
    // Draw the silhouette in a circle to create a solid outline
    const steps = 36; // High quality circle
    for (let i = 0; i < steps; i++) {
        const angle = (Math.PI * 2 * i) / steps;
        const dx = Math.cos(angle) * border;
        const dy = Math.sin(angle) * border;
        ctx.drawImage(tintCanvas, border + dx, border + dy);
    }
    
    // Draw the original image centered on top
    console.log('Overlaying original image...');
    ctx.drawImage(img, border, border);
    
    console.log('Saving to public/my-photo-bordered.png...');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('public/my-photo-bordered.png', buffer);
    console.log('Done!');
}

addBorder().catch(console.error);

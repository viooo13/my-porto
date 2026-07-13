const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function main() {
    try {
        console.log("Loading image...");
        const img = await loadImage('public/my-photo-transparent.png');
        const canvas = createCanvas(img.width, img.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, img.width, img.height);
        const data = imgData.data;
        
        const width = img.width;
        const height = img.height;
        const radius = 2; // Trim 2 pixels from edges
        
        console.log(`Image loaded. Size: ${width}x${height}. Processing alpha channel...`);
        const alpha = new Uint8Array(width * height);
        for (let i = 0; i < width * height; i++) {
            alpha[i] = data[i * 4 + 3];
        }
        
        const newAlpha = new Uint8Array(width * height);
        
        // Erode
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // Quick check: if already transparent, skip
                if (alpha[y * width + x] === 0) {
                    newAlpha[y * width + x] = 0;
                    continue;
                }
                
                let minA = 255;
                for (let dy = -radius; dy <= radius; dy++) {
                    for (let dx = -radius; dx <= radius; dx++) {
                        // Circular radius
                        if (dx*dx + dy*dy <= radius*radius) {
                            const nx = x + dx;
                            const ny = y + dy;
                            if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                                const a = alpha[ny * width + nx];
                                if (a < minA) minA = a;
                            } else {
                                minA = 0;
                            }
                        }
                    }
                }
                newAlpha[y * width + x] = minA;
            }
        }
        
        // Blur alpha to anti-alias (1 pixel blur)
        const blurredAlpha = new Uint8Array(width * height);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let sum = 0;
                let count = 0;
                for (let dy = -1; dy <= 1; dy++) {
                    for (let dx = -1; dx <= 1; dx++) {
                        const nx = x + dx;
                        const ny = y + dy;
                        if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                            sum += newAlpha[ny * width + nx];
                            count++;
                        }
                    }
                }
                blurredAlpha[y * width + x] = Math.round(sum / count);
            }
        }
        
        for (let i = 0; i < width * height; i++) {
            data[i * 4 + 3] = blurredAlpha[i];
        }
        
        ctx.putImageData(imgData, 0, 0);
        
        console.log("Saving image...");
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync('public/my-photo-transparent.png', buffer);
        console.log('Erosion complete.');
    } catch(e) {
        console.error(e);
    }
}
main();

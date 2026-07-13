const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function main() {
    try {
        console.log("Starting background removal...");
        const blob = await removeBackground('public/Gemini_Generated_Image_ortortortortorto.png', {
            debug: true,
            progress: (key, current, total) => {
                // To avoid spamming, only log occasionally or just rely on debug
            }
        });
        const buffer = Buffer.from(await blob.arrayBuffer());
        fs.writeFileSync('public/my-photo-transparent.png', buffer);
        console.log("Success! Saved to public/my-photo-transparent.png");
    } catch (e) {
        console.error("Error:", e);
    }
}
main();

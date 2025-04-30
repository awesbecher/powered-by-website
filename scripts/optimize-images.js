const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, '../public/assets/images');
const outputDir = path.join(__dirname, '../public/assets/images-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Get all PNG files
const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.png'));

// Process each file
async function optimizeImages() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputPath = path.join(outputDir, file);
    
    try {
      // Get original file size
      const originalSize = fs.statSync(inputPath).size;
      
      // Optimize image
      await sharp(inputPath)
        .resize(1200, 1200, { // Max dimensions
          fit: 'inside',
          withoutEnlargement: true
        })
        .png({
          quality: 80,
          compressionLevel: 9,
          palette: true
        })
        .toFile(outputPath);
      
      // Get optimized file size
      const optimizedSize = fs.statSync(outputPath).size;
      const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      
      console.log(`✓ ${file}
        Original: ${(originalSize / 1024).toFixed(1)}KB
        Optimized: ${(optimizedSize / 1024).toFixed(1)}KB
        Saved: ${savings}%`);
      
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error);
    }
  }
}

optimizeImages().then(() => {
  console.log('\nOptimization complete! Review the optimized images in public/assets/images-optimized/');
});

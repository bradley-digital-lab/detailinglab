const { execSync } = require('child_process');
const ffmpeg = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const inputVideo = path.join(__dirname, 'public', 'hero_video.mp4');
const outputDir = path.join(__dirname, 'public', 'hero-frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames safely via static ffmpeg...');

// Extract 24 frames per second to reduce file count (usually ~120 frames total for 5s)
// -q:v 4 outputs highly compressed, decent quality JPGs
try {
  execSync(`"${ffmpeg}" -i "${inputVideo}" -vf fps=24 -q:v 4 "${path.join(outputDir, 'frame_%03d.jpg')}"`, { stdio: 'inherit' });
  console.log('SUCCESS! Frames extracted!');
} catch (error) {
  console.error('Error extracting frames:', error);
}

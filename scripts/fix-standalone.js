const fs = require('fs');
const path = require('path');

const src = '.next';
const dest = '.next/standalone/.next';

function copyIfMissing(srcFile, destFile) {
  if (!fs.existsSync(destFile) && fs.existsSync(srcFile)) {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied: ${destFile}`);
  }
}

function writeIfMissing(destFile, content) {
  if (!fs.existsSync(destFile)) {
    fs.mkdirSync(path.dirname(destFile), { recursive: true });
    fs.writeFileSync(destFile, content);
    console.log(`Created: ${destFile}`);
  }
}

fs.mkdirSync(dest + '/server', { recursive: true });
fs.mkdirSync(dest + '/cache', { recursive: true });

copyIfMissing(src + '/BUILD_ID', dest + '/BUILD_ID');
copyIfMissing(src + '/routes-manifest.json', dest + '/routes-manifest.json');
copyIfMissing(src + '/app-build-manifest.json', dest + '/app-build-manifest.json');
copyIfMissing(src + '/build-manifest.json', dest + '/build-manifest.json');
copyIfMissing(src + '/prerender-manifest.json', dest + '/prerender-manifest.json');
copyIfMissing(src + '/react-loadable-manifest.json', dest + '/react-loadable-manifest.json');
copyIfMissing(src + '/server/middleware-manifest.json', dest + '/server/middleware-manifest.json');
copyIfMissing(src + '/server/app-paths-manifest.json', dest + '/server/app-paths-manifest.json');
copyIfMissing(src + '/server/pages-manifest.json', dest + '/server/pages-manifest.json');
copyIfMissing(src + '/server/font-manifest.json', dest + '/server/font-manifest.json');
copyIfMissing(src + '/server/next-font-manifest.json', dest + '/server/next-font-manifest.json');

writeIfMissing(dest + '/server/pages-manifest.json', '{}');

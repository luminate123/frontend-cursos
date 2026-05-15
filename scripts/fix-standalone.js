const fs = require('fs');
const path = require('path');

const src = '.next';
const dest = '.next/standalone/.next';

function copyDir(srcDir, destDir) {
  if (!fs.existsSync(srcDir)) return;
  fs.mkdirSync(destDir, { recursive: true });
  for (const entry of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, entry.name);
    const d = path.join(destDir, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else if (!fs.existsSync(d)) {
      fs.copyFileSync(s, d);
    }
  }
}

console.log('Syncing .next -> .next/standalone/.next (missing files only)...');
copyDir(src, dest);

// Ensure pages-manifest exists even if Next.js 16 skips it
const pm = path.join(dest, 'server/pages-manifest.json');
if (!fs.existsSync(pm)) {
  fs.mkdirSync(path.dirname(pm), { recursive: true });
  fs.writeFileSync(pm, '{}');
}

console.log('Done.');

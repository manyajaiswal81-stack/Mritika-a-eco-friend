import fs from 'fs';
import path from 'path';
import { PNG } from 'pngjs';

function createIcon(width, height, isMaskable = false) {
  const png = new PNG({ width, height });

  // Background: Deep earthen dark brown #1E140B
  const bgR = 0x24, bgG = 0x18, bgB = 0x0E;
  
  // Center coordinates
  const cx = width / 2;
  const cy = height / 2;
  const scale = (isMaskable ? 0.72 : 0.88) * (width / 512);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) << 2;

      // Base background
      let r = bgR;
      let g = bgG;
      let b = bgB;
      let a = 255;

      // Rounded squircle boundary if not maskable
      const distFromCenter = Math.hypot(x - cx, y - cy);
      const cornerRadius = width * 0.44;

      if (!isMaskable && distFromCenter > cornerRadius) {
        a = 0;
      }

      if (a > 0) {
        // Subtle radial glow from center
        const glow = Math.max(0, 1 - distFromCenter / (width * 0.6));
        r = Math.min(255, r + glow * 25);
        g = Math.min(255, g + glow * 15);
        b = Math.min(255, b + glow * 10);

        // Relative coordinates centered and scaled
        const rx = (x - cx) / scale;
        const ry = (y - cy) / scale;

        // 1. Sacred Outer Ring
        const ringDist = Math.hypot(rx, ry);
        if (Math.abs(ringDist - 210) < 4) {
          r = 0xD9; g = 0x77; b = 0x06; // Gold accent
        } else if (Math.abs(ringDist - 225) < 3) {
          r = 0x84; g = 0x3E; b = 0x1F; // Terracotta accent
        }

        // 2. Terracotta Kulhar Earthen Cup:
        // Top rim: y in [20, 60], rx in [-90, 90]
        // Body: y in [40, 200], x taper from width 90 down to 60 at base
        const kulharY = ry + 20; // shift down
        if (kulharY >= 0 && kulharY <= 170) {
          // Width of cup at this depth
          const t = kulharY / 170; // 0 at top, 1 at bottom
          const halfWidth = 85 * (1 - t * 0.35); // 85 at top -> 55 at bottom

          if (Math.abs(rx) <= halfWidth) {
            // Terracotta gradient: warm brick orange #C25A2B to rich clay #843E1F
            const clayShade = 1 - (rx / halfWidth) * 0.3; // 3D cylinder light
            r = Math.floor(Math.min(255, (0xC2 - t * 0x30) * clayShade));
            g = Math.floor(Math.min(255, (0x5A - t * 0x20) * clayShade));
            b = Math.floor(Math.min(255, (0x2B - t * 0x15) * clayShade));

            // Earthen wheel rings
            if (Math.abs(kulharY - 50) < 3 || Math.abs(kulharY - 95) < 3 || Math.abs(kulharY - 135) < 2.5) {
              r = Math.min(255, r + 40);
              g = Math.min(255, g + 25);
              b = Math.min(255, b + 15);
            }
          }
        }

        // Kulhar Rim (Ellipse at top y = 0)
        const rimDist = Math.hypot(rx / 85, kulharY / 24);
        if (rimDist <= 1) {
          if (rimDist > 0.8) {
            r = 0xE8; g = 0x82; b = 0x56; // Rim highlight
          } else {
            r = 0x52; g = 0x20; b = 0x0B; // Deep dark inside of cup
          }
        }

        // 3. Green Living Sprout (Growing upwards from cup y = 0 upwards to y = -140)
        // Stem:
        if (kulharY < 10 && kulharY > -140) {
          const stemX = Math.sin((kulharY) / 40) * 12;
          if (Math.abs(rx - stemX) < 4.5) {
            r = 0x05; g = 0x96; b = 0x69; // Emerald green
          }
        }

        // Left Leaf: centered around rx = -35, kulharY = -60
        const leaf1X = rx + 35;
        const leaf1Y = kulharY + 60;
        if (Math.hypot(leaf1X / 35, leaf1Y / 20) <= 1) {
          r = 0x10; g = 0xB9; b = 0x81;
        }

        // Right Leaf: centered around rx = 40, kulharY = -95
        const leaf2X = rx - 40;
        const leaf2Y = kulharY + 95;
        if (Math.hypot(leaf2X / 40, leaf2Y / 22) <= 1) {
          r = 0x34; g = 0xD3; b = 0x99;
        }

        // Top Golden Sparkle / Seed at rx = 0, kulharY = -145
        if (Math.hypot(rx, kulharY + 145) < 7) {
          r = 0xFD; g = 0xE6; b = 0x8A; // Radiant seed
        }
      }

      png.data[idx] = r;
      png.data[idx + 1] = g;
      png.data[idx + 2] = b;
      png.data[idx + 3] = a;
    }
  }

  return png;
}

const outDir = path.resolve('public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 1. 192x192
const pwa192 = createIcon(192, 192, false);
pwa192.pack().pipe(fs.createWriteStream(path.join(outDir, 'pwa-192x192.png')));

// 2. 512x512
const pwa512 = createIcon(512, 512, false);
pwa512.pack().pipe(fs.createWriteStream(path.join(outDir, 'pwa-512x512.png')));

// 3. Maskable 512x512 with safe margin
const pwaMaskable = createIcon(512, 512, true);
pwaMaskable.pack().pipe(fs.createWriteStream(path.join(outDir, 'pwa-maskable-512x512.png')));

// 4. Apple Touch Icon 180x180
const appleIcon = createIcon(180, 180, false);
appleIcon.pack().pipe(fs.createWriteStream(path.join(outDir, 'apple-touch-icon.png')));

// 5. Favicon 48x48
const favicon = createIcon(48, 48, false);
favicon.pack().pipe(fs.createWriteStream(path.join(outDir, 'favicon.ico')));

console.log('Successfully generated all PWA icons in /public: 192x192, 512x512, maskable 512x512, apple-touch-icon, and favicon.ico');

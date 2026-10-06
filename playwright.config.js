import { defineConfig } from '@playwright/test';
import { existsSync } from 'node:fs';
const localChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
export default defineConfig({
  testDir: './tests/browser',
  use: {baseURL:'http://127.0.0.1:5173',viewport:{width:1366,height:768},launchOptions:existsSync(localChrome)?{executablePath:localChrome}:{}},
  webServer:{command:'npm run dev -- --port 5173 --strictPort',url:'http://127.0.0.1:5173',reuseExistingServer:true},
});

// 预留 preload（可在此处暴露安全的 API 给渲染进程）
// 目前无需额外功能，保持空实现避免安全风险。
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('__APP_ENV__', {
  platform: process.platform,
});

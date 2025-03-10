import { readFileSync } from 'node:fs';

export function loadJson(filePath) {
  try {
    // 同步读取文件内容
    const data = readFileSync(filePath, 'utf8');
    // 将 JSON 字符串转换为对象
    const jsonObject = JSON.parse(data);
    return jsonObject;
  } catch (err) {
    console.error('读取 JSON 文件失败', err);
    throw err; // 抛出错误以便外部处理
  }
}

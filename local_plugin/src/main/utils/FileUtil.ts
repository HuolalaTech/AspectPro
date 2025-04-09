//@ts-ignore
import * as fs from 'fs';

export function renameFileToTs(filePath: string): string {
  const newFilePath = filePath.replace(/\.ets$/, '.ts');
  fs.renameSync(filePath, newFilePath);
  return newFilePath;
}

export function revertFileName(filePath: string, originalExtension: string) {
  const originalFilePath = filePath.replace(/\.ts$/, originalExtension);
  fs.renameSync(filePath, originalFilePath);
}

export function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content);
}

export function readFile(filePath: string, type: string = 'utf-8'): string {
  return fs.readFileSync(filePath, type)
}

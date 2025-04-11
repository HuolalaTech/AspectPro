//@ts-ignore
import * as ts from 'typescript';
import { getSourceFile, printSourceFile } from '../ast/apis/TransformerApis';
import { writeFile } from '../utils/FileUtil';

const TAG:string = "BasePluginImp";

export abstract class BasePluginImp {

  public doTransform(ts, sourcefile: ts.SourceFile):  ts.SourceFile {
    return this.pluginImp(ts, sourcefile)
  }

  public start(ts, originFile: string, ...args: any[]): void {
    if (this.isSupportFile(originFile)) {
      this.processFile(ts, originFile, ...args);
    } else {
      console.debug(TAG, `not support this File  ${originFile} , just return`);
      return
    }
  }

  protected abstract isSupportFile(filePath: string): boolean;
  protected abstract pluginImp(ts, tsSourceFile: ts.SourceFile, ...args: any[]): ts.SourceFile;

  protected processFile(ts, filePath: string, ...args: any[]): void {
    try {
      const tsSourceFile = getSourceFile(ts, filePath);
      const afterPluginsSourceFile: ts.SourceFile = this.pluginImp(ts, tsSourceFile, filePath, ...args);
      let finalContent = printSourceFile(ts, afterPluginsSourceFile)
      // console.warn(TAG, "5.processOriginFile to sourceFile by TS CompilerAPI content:\n" + finalContent)
      writeFile(filePath, finalContent);
    } catch (error) {
      console.error(TAG, `Failed to process file ${filePath},`, error);
    }
  }
}
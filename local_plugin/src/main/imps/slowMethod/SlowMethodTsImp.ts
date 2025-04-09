import { startSlowMethodTransformer } from '../../ast/transformers/SlowMethodTransformer';
import { BasePluginImp } from '../BasePluginImp';
//@ts-ignore
import * as ts from 'typescript';

const VALID_FILE_REGEX = /\.(ts|js)$/;

export class SlowMethodTsImp extends BasePluginImp {

  protected isSupportFile(filePath: string): boolean {
    return VALID_FILE_REGEX.test(filePath);
  }
  protected pluginImp(tsSourceFile: ts.SourceFile, filePath: string, ...args: any[]): ts.SourceFile {
    return startSlowMethodTransformer(tsSourceFile, filePath);
  }
}
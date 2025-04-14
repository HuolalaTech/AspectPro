/*
import { startSlowMethodTransformer } from '../../ast/transformers/SlowMethodTransformer';
import { BasePluginImp } from '../BasePluginImp';
//@ts-ignore
import * as ts from 'typescript';

const VALID_FILE_REGEX = /\.(ts|js)$/;

export class SlowMethodTsImp extends BasePluginImp {

  protected isSupportFile(filePath: string): boolean {
    return VALID_FILE_REGEX.test(filePath);
  }
  protected pluginImp(sourceFile: ts.SourceFile,  ...args: any[]): ts.SourceFile {
    return startSlowMethodTransformer(sourceFile);
  }
}*/

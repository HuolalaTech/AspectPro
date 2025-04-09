//@ts-ignore
import * as ts from 'typescript';
import { replaceCallExpression } from '../../ast/transformers/AspectProTransformer';
import { ReplaceRule } from '../../configs/parsers/BaseConfigParser';
import { BasePluginImp } from '../BasePluginImp';


const VALID_FILE_REGEX = /\.(ts|js)$/;

export class AspectProTsImp extends BasePluginImp {
  protected isSupportFile(filePath: string): boolean {
    return VALID_FILE_REGEX.test(filePath);
  }
  protected pluginImp(tsSourceFile: ts.SourceFile, filePath: string, ...args: any[]): ts.SourceFile {
    return replaceCallExpression(tsSourceFile, filePath, args as ReplaceRule[]);
  }

}


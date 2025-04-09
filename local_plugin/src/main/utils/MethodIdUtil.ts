//@ts-ignore
import * as ts from 'typescript';

/**
 * todo greek 方法id生成如何唯一确定并使用number表示？？
 * 常规方法id = 方法路径 + 方法来源 + 方法类型 + 是否静态 + 方法名称 + 方法参数 + 方法参数类型 + 返回值类型
 * 箭头方法id = 方法路径 +方法行数+ 方法来源 + 方法类型 +  方法名称 + 方法参数 + 方法参数类型 + 返回值类型
 */
export function generateMethodID(method: ts.FunctionDeclaration
  | ts.FunctionExpression
  | ts.MethodDeclaration
  | ts.GetAccessorDeclaration
  | ts.ArrowFunction,
  filePath: string): string {
  // return `${filePath}#` + method.toString();
  return `needMethodId`;
}


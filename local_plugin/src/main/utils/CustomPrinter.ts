//@ts-ignore
import * as ts from 'typescript';

/**
 * @deprecated 待定
 * 1.import 需去重
 * todo greekets格式问题：
 *  2.custom printer Import 未换行？
 *  3.custom printer 对exports 关键字处理不符合ets 预期
 *  4.custom printer 对struct 关键字处理不符合ets 预期
 *  5.custom printer 对Third 关键字处理不符合ets 预期
 *  6.custom printer 对Build() 处理不符合ets 预期
 *  7.custom printer 对RelativeContainer()、 Button() 、Text()等处理不符合ets 预期
 */

export function customPrint(sourceFile: ts.SourceFile): string {
  const printer = ts.createPrinter({
    omitTrailingSemicolon: true,
    removeComments: false,
  });

  let result = '';

  function visit(node: ts.Node): void {
    if (ts.isSourceFile(node)) {
      node.forEachChild(visit);
    } else {
      // if (ts.isDecorator(node) || ts.isMissingDeclaration(node)) {
      //   // 1.保留装饰器Decorator及所有ts无法识别的类型MissingDeclaration
      //   result += node.getFullText(sourceFile);
      // } /*else if (ts.isImportDeclaration(node) && !node.getFullText(sourceFile).endsWith('\n')) {
      //   // 2.import 需换行
      //   result +=  node.getFullText(sourceFile) + '\n';
      // } else if (ts.isExportModifier(node) && !node.getFullText(sourceFile).endsWith(' ')) {
      //   // 3.单独处理ExportKeyword ，需要加上空格
      //   result += node.getFullText(sourceFile) + ' ';
      // }*/
      // else {
      //   // 处理其他类型的节点，避免对子节点进行重复打印
      //   result += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
      // }

      result += printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
    }
  }

  visit(sourceFile);

  return result;
}


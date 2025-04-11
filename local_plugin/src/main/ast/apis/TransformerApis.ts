//@ts-ignore
// import * as ts from 'typescript';

export function applyTransform(
  ts,
  sourceFile/*: ts.SourceFile*/,
  visitorFactory/*: (context: ts.TransformationContext, ...args: any[]) => ts.Visitor*/,
  ...args: any[]
)/*: ts.SourceFile*/ {
  console.log("2.applyTransform ....")
  const transformerFactory/*: ts.TransformerFactory<ts.SourceFile>*/ = (context) => {
    return (rootNode) => ts.visitNode(rootNode, visitorFactory(context, ...args));
  };
  const result = ts.transform(sourceFile, [transformerFactory]);
  let transformedSourceFile = result.transformed[0];
  result.dispose();
  console.log("3.applyTransform ....")
  return transformedSourceFile
}

export function printSourceFile(ts, sourceFile/*: ts.SourceFile*/): string {
  const printer = ts.createPrinter();
  return printer.printFile(sourceFile);
}

function getProgram(ts, filePath) {
  return ts.createProgram([filePath], {});
}

export function getSourceFile(ts ,filePath) {
  return getProgram(ts, filePath).getSourceFile(filePath);
}

export function getSourceFileWithContent(ts, filePath: string, content: string)/*: ts.SourceFile*/ {
  return ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true);
}


/*
//@ts-ignore
import * as ts from 'typescript';

*/
/**
 *
 * @param sourceFile  xxx.ts|ets
 * @param importName  'ApmMethodMonitor'
 * @param importPath  '@huolala/aspectpro/src/main/com/wp/slowMethod/ApmMethodMonitor'
 * @returns
 *//*

export function insertImportStatement(sourceFile: ts.SourceFile, importName: string,
  importPath: string): ts.SourceFile {

  if (isImportExist(sourceFile, importPath, importName)) {
    return sourceFile;
  }

  const importSpecifier = ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(importName));
  const namedImports = ts.factory.createNamedImports([importSpecifier]);

  const importClause = ts.factory.createImportClause(false, undefined, namedImports);

  const importStatement = ts.factory.createImportDeclaration(
    undefined,
    importClause,
    ts.factory.createStringLiteral(importPath)
  );

  const newStatements = ts.factory.createNodeArray([
    importStatement,
    ...sourceFile.statements
  ]);

  return ts.factory.updateSourceFile(sourceFile, newStatements);
}

function isImportExist(sourceFile: ts.SourceFile, importPath: string, importName: string) {
  return sourceFile.statements.some((statement: ts.Statement) => {
    if (ts.isImportDeclaration(statement)) {
      const importDeclaration = statement as ts.ImportDeclaration;
      const moduleSpecifier = importDeclaration.moduleSpecifier;
      if (ts.isStringLiteral(moduleSpecifier) && (moduleSpecifier as ts.StringLiteral).text === importPath) {
        const importClause = importDeclaration.importClause;
        if (importClause) {
          const namedBindings = importClause.namedBindings;
          if (namedBindings && ts.isNamedImports(namedBindings)) {
            return (namedBindings as ts.NamedImports).elements.some((element: ts.ImportSpecifier) => element.name.text === importName);
          }
        }
      }
    }
    return false;
  });
}
*/

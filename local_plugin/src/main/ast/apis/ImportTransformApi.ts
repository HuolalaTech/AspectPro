export class ImportTransformApi {
  /**
   *
   * @param sourceFile
   * @param ts
   * @param importName  like 'ApmMethodMonitor'
   * @param importPath  like 'import { ApmMethodMonitor } from "@huolala/aspectpro";'
   * @returns addImportSourceFile
   */
  static addImportStatement(sourceFile, ts, importName: string,
    importPath: string) {
    if (this.isImportExist(sourceFile, ts, importPath, importName)) {
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

  static isImportExist(sourceFile, ts, importPath: string, importName: string) {
    return sourceFile.statements.some((statement) => {
      if (ts.isImportDeclaration(statement)) {
        const importDeclaration = statement;
        const moduleSpecifier = importDeclaration.moduleSpecifier;
        if (ts.isStringLiteral(moduleSpecifier) && importPath.includes((moduleSpecifier).text)) {
          const importClause = importDeclaration.importClause;
          if (importClause) {
            const namedBindings = importClause.namedBindings;
            if (namedBindings && ts.isNamedImports(namedBindings)) {
              return (namedBindings).elements.some((element) => element.name.text === importName);
            }
          }
        }
      }
      return true;
    });
  }
}


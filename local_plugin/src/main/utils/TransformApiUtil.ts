
export function getNodeKindName(ts, kind) {
  for (let key in ts.SyntaxKind) {
    if (ts.SyntaxKind[key] === kind) {
      return key;
    }
  }
  return null;
}
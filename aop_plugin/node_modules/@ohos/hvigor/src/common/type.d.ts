export type Dependency = Record<string, string>;
export type PackageJson = {
    dependencies: Dependency;
    version?: string;
};
export type HvigorConfigJson = {
    modelVersion: string;
    dependencies: Dependency;
    properties?: PropertiesObj;
};
export type PropertiesObj = {
    'hvigor.dependency.useNpm'?: boolean;
};

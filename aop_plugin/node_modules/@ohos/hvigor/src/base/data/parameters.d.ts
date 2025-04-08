import { CoreProperties, ParamValue } from '../internal/data/global-core-parameters.js';
export interface Parameter {
    getProperty(key: string): any | undefined;
    getProperties(): Properties;
    getExtParam(key: string): string | undefined;
    getExtParams(): Record<string, string>;
    getStartParams(): StartParam;
    getWorkspaceDir(): string;
}
export interface ExternalStartParam {
    analyze: string | boolean;
    daemon: boolean;
    parallel: boolean;
    incremental: boolean;
    logLevel: string;
    typeCheck: boolean;
}
export type Properties = Readonly<CoreProperties>;
export type StartParam = Readonly<ExternalStartParam>;
export declare class ExternalParameter implements Parameter {
    private coreParameter;
    private readonly _properties;
    private readonly _extParams;
    private readonly _startParams;
    private readonly _workspaceDir;
    constructor();
    getExtParam(key: string): string | undefined;
    getExtParams(): Readonly<Record<string, string>>;
    getProperties(): Readonly<Record<string, ParamValue>>;
    getProperty(key: string): ParamValue;
    getStartParams(): StartParam;
    getWorkspaceDir(): string;
}

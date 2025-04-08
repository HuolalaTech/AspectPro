export declare function checkHvigorConfigBeforeProgram(cliArgv: any, logger: any): {
    result: boolean;
    message?: undefined;
    stack?: undefined;
} | {
    result: boolean;
    message: string;
    stack?: undefined;
} | {
    result: boolean;
    stack: any;
    message: any;
};

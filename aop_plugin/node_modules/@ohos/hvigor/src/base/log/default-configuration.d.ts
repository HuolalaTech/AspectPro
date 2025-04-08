import { Configuration, Level } from 'log4js';
export declare const logFilePath: () => string;
export declare const setConfiguration: (config: Configuration) => void;
export declare const getConfiguration: () => Configuration;
export declare const updateConfiguration: () => Configuration;
export declare const setCategoriesLevel: (level: Level, ignoreLevelCategoryFilterArr?: string[]) => void;
export declare const getLevel: () => Level;
export declare const levelMap: Map<string, Level>;

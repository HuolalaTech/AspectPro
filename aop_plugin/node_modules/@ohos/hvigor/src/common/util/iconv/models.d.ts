/// <reference types="node" />
/**
 * 编解码选项
 */
export interface Options {
    stripBOM?: boolean;
    addBOM?: boolean;
    defaultEncoding?: string;
}
/**
 * 编码器接口
 */
export interface Encoder {
    write(str: string): Buffer;
    end(): Buffer | undefined;
}
/**
 * 解码器接口
 */
export interface Decoder {
    write(buf: Buffer | Uint8Array): string;
    end(): string | undefined;
}
export type Constructor<T, Arguments extends unknown[] = any[]> = new (...arguments_: Arguments) => T;
/**
 * 编码解析器对象
 */
export interface Codec {
    encodingName?: string;
    bomAware?: boolean;
    defaultCharUnicode?: string;
    defCharSB?: any;
    decodeTables?: any[];
    decodeTableSeq?: any[];
    encodeTable?: any[];
    encodeTableSeq?: any[];
    decoder: Constructor<Decoder>;
    encoder: Constructor<Encoder>;
}
export type CodecOption = EncodingOption & {
    encodingName?: string;
};
export interface EncodingOption {
    type: string;
    bomAware?: boolean;
    table?: () => any[][];
}
export type Encoding = {
    [key: string]: string | EncodingOption | Constructor<Codec>;
};
export declare const defaultCharUnicode = "\uFFFD";
export declare const defaultCharSingleByte = "?";

/// <reference types="node" />
import { Decoder, Encoder, Options } from './models.js';
/**
 * StripBOMDecoderWrapper 解码器
 */
export declare class StripBOMDecoderWrapper implements Decoder {
    private decoder;
    private pass;
    private options;
    constructor(decoder: Decoder, options?: Options);
    write(buffer: Buffer | Uint8Array): string;
    end(): string | undefined;
}
/**
 * PrependBOMEncoderWrapper 编码器
 */
export declare class PrependBOMEncoderWrapper implements Encoder {
    private readonly encoder;
    private addBOM;
    constructor(encoder: Encoder, options?: Options);
    write(str: string): Buffer;
    end(): Buffer | undefined;
}

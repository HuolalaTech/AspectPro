/// <reference types="node" />
import { AddressInfo } from 'net';
import { DaemonInfo } from './daemon-info.js';
declare class DaemonInfoService {
    createDefaultDaemonInfo(serverAddress: AddressInfo, sessionId: string): DaemonInfo;
}
export declare const defaultDaemonInfoService: DaemonInfoService;
export {};

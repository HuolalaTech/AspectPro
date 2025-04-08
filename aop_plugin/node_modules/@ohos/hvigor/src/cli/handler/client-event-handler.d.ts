import { BuildStatusMessage, Message, OutputMessage } from '../../base/common/daemon-protocol/message.js';
import { HvigorLogger } from '../../base/log/hvigor-log.js';
export declare function printLog(output: OutputMessage): void;
export declare function handleBuildStatus(msg: BuildStatusMessage): void;
export declare function handleWatchBuildResult(msg: any): void;
export declare function handleWatchLog(msg: any): void;
export declare function handleServerMsgError(log: HvigorLogger, msg: Message): void;

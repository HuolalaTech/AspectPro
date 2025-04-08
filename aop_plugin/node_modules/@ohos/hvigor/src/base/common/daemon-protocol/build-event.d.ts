export declare enum BuildEvent {
    COMMON_BUILD = "CommonBuild",
    CANCEL_BUILD = "CancelBuild",
    STOP_DAEMON = "StopDaemon",
    OUTPUT = "Output",
    BUILD_STATUS = "BuildStatus"
}
export declare enum WatchEvent {
    WATCH_START = "WatchStart",
    WATCH_RESULT = "WatchResult",
    CLOSE_WATCH = "CloseWatch",
    WATCH_COMPILE_RESULT = "WatchCompileResult",
    WATCH_COMPILE_DATA = "WatchCompileData",
    WATCH_LOG = "WatchLog",
    TERMINATE_WORKER = "TerminateWorker",
    NEW_WATCH_WORKER = "NewWatchWorker"
}

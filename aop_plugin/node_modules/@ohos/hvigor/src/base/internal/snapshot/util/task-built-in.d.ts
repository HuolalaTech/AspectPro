/**
 * Copyright (c) Huawei Technologies Co., Ltd. 2022-2022. All rights reserved.
 */
export declare namespace TaskBuiltIn {
    enum Execution {
        COMMAND = "BUILTIN_TASK_COMMAND",
        TOOLCHAIN = "BUILTIN_TASK_TOOLCHAIN",
        ENV = "BUILTIN_TASK_ENV"
    }
    const snapshotSerializationReplacer: (key: string, value: any) => any;
    const snapshotSerializationReceiver: (key: string, jsonEntry: any) => any;
}

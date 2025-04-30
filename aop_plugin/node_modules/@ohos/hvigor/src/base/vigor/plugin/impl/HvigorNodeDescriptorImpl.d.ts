import { HvigorNodeDescriptor } from '../interface/hvigor-node-descriptor.js';
export declare class HvigorNodeDescriptorImpl implements HvigorNodeDescriptor {
    name: string;
    srcPath: string;
    extraOptions: Map<string, any>;
    private childrenNode;
    private rootNode;
    constructor(name: string, srcPath: string, childrenNode: HvigorNodeDescriptor[] | undefined, rootNode: HvigorNodeDescriptor | undefined);
    getChildNode(): HvigorNodeDescriptor[] | undefined;
    getRootNode(): HvigorNodeDescriptor;
    setChildNode(childrenNode: HvigorNodeDescriptor[] | undefined): void;
}

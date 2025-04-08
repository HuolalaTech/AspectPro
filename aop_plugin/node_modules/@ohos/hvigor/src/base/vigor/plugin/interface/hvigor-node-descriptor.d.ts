/**
 * hvigorNode对象的描述对象 只定义了简单的node中存在的基本属性，用来在node对象创建前描述node
 */
export interface HvigorNodeDescriptor {
    name: string;
    srcPath: string;
    extraOptions: Map<string, any>;
    getChildNode(): HvigorNodeDescriptor[] | undefined;
    getRootNode(): HvigorNodeDescriptor;
}

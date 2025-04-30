/**
 * 由于直接使用js的instanceOf不太方便，以及规避不了一些原生的问题，比如import 循环
 * 故使用给不同类型的类增加一个标识来判断
 * 以下包含Hvigor中用来区分一些工程结构的对象类型的属性值
 *
 * @since 2022/6/20
 */
export declare class ClassTypeConst {
    static readonly HVIGOR_NODE: string;
    static readonly HVIGOR_PROJECT: string;
    static readonly HVIGOR_MODULE: string;
}

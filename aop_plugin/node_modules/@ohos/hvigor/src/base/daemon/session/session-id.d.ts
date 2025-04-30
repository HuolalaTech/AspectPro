import { HvigorLogger } from '../../log/hvigor-log.js';
/**
 * SessionId加解密相关操作的工具类
 *
 * @since 2023/5/23
 */
export declare class SessionIdHelper {
    private static dirs;
    private static macDSStore;
    private static component;
    private static key;
    /**
     * 加密
     *
     * @param msg 明文
     * @param log HvigorLogger
     * @return string 密文
     */
    static encryptPwdByDefaultMaterial(msg: string, log: HvigorLogger): string;
    /**
     * 使用aes-gcm算法加密消息
     * AesGcmKit，其实现符合《密码算法应用规范 V1.4.docx》中针对于AES-GCM的使用要求
     * 填充参数是NoPadding，密钥长度16 byte(128 bit)，iv长度12 byte(96bit)，iv每次都是采用SecureRandom生成，
     * tag参数长度16 byte(128 bit)。
     *
     * @param msg 密码明文
     * @param log HvigorLogger
     * @return string
     */
    static encryptPwd(msg: string, log: HvigorLogger): string;
    /**
     * 根据密钥加密, 获取密文密码
     * 被加密后的数据格式如下
     * 其中content数据中包含tag数据
     * -------------------------------------------------------------------------------
     * | content length (4byte) | iv key (12 byte) | encrypted | auth tag ( 16 byte ) |
     *  ------------------------------------------------------------------------------
     *
     * @param key 密钥
     * @param msg 明文
     * @private Buffer.Buffer
     */
    private static encrypt;
    /**
     * 解密
     *
     * @param ciphertext 密文
     * @param log HvigorLogger
     * @return string 明文
     */
    static decryptPwdByDefaultMaterial(ciphertext: string, log: HvigorLogger): string;
    /**
     * 使用aes-gcm算法解密消息
     * AesGcmKit，其实现符合《密码算法应用规范 V1.4.docx》中针对于AES-GCM的使用要求
     * 填充参数是NoPadding，密钥长度16 byte(128 bit)，iv长度12 byte(96bit)，iv每次都是采用SecureRandom生成，tag参数长度16 byte(128 bit)。
     *
     * @param encryptedPwd 加密密码
     * @param log HvigorLogger
     * @return string
     */
    static decryptPwd(encryptedPwd: string, log: HvigorLogger): string;
    /**
     * 根据密钥解密, 获取明文密码
     * 被加密后的数据格式如下
     * 其中content数据中包含tag数据
     * -------------------------------------------------------------------------------
     * | content length (4byte) | iv key (12 byte) | encrypted | auth tag ( 16 byte ) |
     *  ------------------------------------------------------------------------------
     *
     * @param key 密钥
     * @param msg 加密密码
     * @private Buffer.Buffer
     */
    private static decrypt;
    /**
     * 获取解密密钥
     *
     * @param materialDir 签名材料地址
     * @param log HvigorLogger
     * @private Int8Array
     */
    private static getKey;
    /**
     * PBKDF2WithHmacSHA256迭代10000次生成rootKey
     *
     * @param components
     * @param salt
     * @param log
     * @private
     */
    private static getRootKey;
    private static xorComponents;
    /**
     * 异或
     *
     * @param b1
     * @param b2
     * @param log
     * @private
     */
    private static xor;
    /**
     * 读取./material/fd
     *
     * @param dir
     * @param log
     * @private
     */
    private static readFd;
    /**
     * 读取盐值./material/ac
     *
     * @param dir
     * @param log
     * @private
     */
    private static readSalt;
    /**
     * workMaterial ./material/ce
     *
     * @param dir
     * @param log
     * @private
     */
    private static readWorkMaterial;
    /**
     * 读取目录中文件 默认一个文件
     *
     * @param dir
     * @param log
     * @private
     */
    private static readDirBytes;
    private static createMaterial;
    private static createAndStoreKey;
    private static createAndStoreEnKey;
}

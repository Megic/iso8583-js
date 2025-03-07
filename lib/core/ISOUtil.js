"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ISOUtil {
    /**
     * 数组复制
     *
     * @param src 源数组
     * @param srcStart 源数组起始索引
     * @param dest 目标数组
     * @param destStart 目标数组起始索引
     * @param length 复制的长度
     */
    static arraycopy(src, srcStart, dest, destStart, length) {
        const end = destStart + length;
        let i = destStart;
        while (i < end) {
            dest[i++] = src[srcStart++];
        }
    }
    /**
     * 复制原数组的数据，并得到一个长度为newLen的新数组
     *
     * @param arr
     * @param newLen
     */
    static copyOf(arr, newLen) {
        if (newLen <= arr.length) {
            return arr.slice(0, newLen);
        }
        else {
            const newArr = new Uint8Array(newLen);
            ISOUtil.arraycopy(arr, 0, newArr, 0, arr.length);
            return newArr;
        }
    }
    /**
     * 填充数组
     *
     * @param arr
     * @param fill
     */
    static fill(arr, fill) {
        let i = arr.length;
        while (--i >= 0) {
            arr[i] = fill;
        }
    }
    /**
     * 数字转指定长度的字符串（不超过7位）
     *
     * @param num 数字
     * @param len 长度
     */
    static toFixed(num, len) {
        const s = (10000000 + num).toString();
        return s.substring(s.length - len);
    }
    /**
     * 获取十六进制字符对应的十进制数
     *
     * @param c
     */
    static getV(c) {
        if (c >= 48 && c <= 57) {
            return c - 48;
        }
        if (c >= 65 && c <= 70) {
            return c - 55;
        }
        if (c >= 97 && c <= 102) {
            return c - 87;
        }
        return 0;
    }
    /**
     * 字符串转BCD码
     *
     * @param s
     * @param len
     */
    static toBCD(s, len) {
        len = len || s.length;
        const rs = new Uint8Array((len + 1) >> 1);
        const slen = s.length;
        const rslen = rs.length * 2;
        const getV = ISOUtil.getV;
        let i = 0;
        for (; i < slen; i++) {
            if (i >= len)
                continue;
            const c = getV(s.charCodeAt(i));
            if ((i & 1) === 0) {
                rs[i >> 1] |= (c << 4);
            }
            else {
                rs[i >> 1] |= c;
            }
        }
        for (; i < rslen; i++) {
            if ((i & 1) === 0) {
                rs[i >> 1] |= 0xF0;
            }
            else {
                rs[i >> 1] |= 0x0F;
            }
        }
        return rs;
    }
    /**
     * 数字转高八位数组
     *
     * @param n
     */
    static toHBU8Array(n) {
        const rs = new Uint8Array(2);
        rs[0] = (n >> 8) & 0xFF;
        rs[1] = (n >> 0) & 0xFF;
        return rs;
    }
    /**
     * 数字转低八位数组
     *
     * @param n
     */
    static toLBU8Array(n) {
        const rs = new Uint8Array(2);
        rs[0] = (n >> 0) & 0xFF;
        rs[1] = (n >> 8) & 0xFF;
        return rs;
    }
    /**
     *
     * @param s
     */
    static isChars(s) {
        const len = (s === null || s === void 0 ? void 0 : s.length) || 0;
        const empCode = ' '.charCodeAt(0);
        let i = 0;
        while (i < len) {
            let c = s.charCodeAt(i++);
            if (c < empCode) {
                return false;
            }
        }
        return true;
    }
    /**
     * 字节数组异或
     *
     * @param bs1
     * @param bs2
     */
    xor(bs1, bs2) {
        if (bs1.length != bs2.length) {
            throw new Error("数组长度不一致");
        }
        const len = bs1.length;
        for (let i = 0; i < len; i++) {
            bs1[i] ^= bs2[i];
        }
    }
    /**
     * 字节数组转字符串
     *
     * @param bs
     */
    byte2string(bs) {
        return String.fromCharCode(...bs);
    }
    /**
     * 字符串转字节数组
     *
     * @param s
     */
    static string2byte(s) {
        const length = (s === null || s === void 0 ? void 0 : s.length) || 0;
        const array = new Uint8Array(length);
        for (let p = 0; p < length; p++) {
            array[p] = s.charCodeAt(p) & 0xFF;
        }
        return array;
    }
}
exports.default = ISOUtil;
/**
 * 十六进制字符数组
 */
ISOUtil.CA = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

package com.teamscope.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 统一API响应格式
 * <p>
 * 所有 Controller 接口统一使用此类封装返回值，
 * 前端根据 code 判断请求是否成功：
 * - 200: 成功
 * - 400: 参数校验失败
 * - 500: 服务端异常
 *
 * @param <T> 响应数据的类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result<T> {

    /** 状态码，200 表示成功 */
    private int code;

    /** 响应消息，成功时为 "success"，失败时为具体错误描述 */
    private String message;

    /** 响应数据，可为 null */
    private T data;

    // ==================== 静态工厂方法 ====================

    /**
     * 成功响应（无数据）
     */
    public static <T> Result<T> ok() {
        return new Result<>(200, "success", null);
    }

    /**
     * 成功响应（携带数据）
     *
     * @param data 返回给前端的数据
     */
    public static <T> Result<T> ok(T data) {
        return new Result<>(200, "success", data);
    }

    /**
     * 成功响应（自定义消息 + 数据）
     *
     * @param message 自定义成功消息
     * @param data    返回给前端的数据
     */
    public static <T> Result<T> ok(String message, T data) {
        return new Result<>(200, message, data);
    }

    /**
     * 失败响应
     *
     * @param code    业务错误码
     * @param message 错误描述
     */
    public static <T> Result<T> fail(int code, String message) {
        return new Result<>(code, message, null);
    }

    /**
     * 参数校验失败快捷方法
     *
     * @param message 校验失败原因
     */
    public static <T> Result<T> badRequest(String message) {
        return new Result<>(400, message, null);
    }

    /**
     * 服务端异常快捷方法
     *
     * @param message 异常描述
     */
    public static <T> Result<T> error(String message) {
        return new Result<>(500, message, null);
    }
}

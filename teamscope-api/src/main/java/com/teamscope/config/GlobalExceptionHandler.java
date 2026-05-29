package com.teamscope.config;

import com.teamscope.common.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理器
 * <p>
 * 统一拦截 Controller 层抛出的异常，
 * 转换为前端可识别的 Result 格式，避免异常栈暴露给前端
 */
@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 参数校验失败异常
     * <p>
     * 当 @Valid 注解的入参校验不通过时，Spring 抛出此异常。
     * 提取第一个校验失败的消息返回前端
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result<Void> handleValidation(MethodArgumentNotValidException e) {
        String message = e.getBindingResult().getFieldErrors().stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .findFirst()
                .orElse("参数校验失败");
        return Result.badRequest(message);
    }

    /**
     * 通用业务异常
     * <p>
     * Service 层抛出 RuntimeException 时由此外理，
     * 返回统一错误格式
     */
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleRuntime(RuntimeException e) {
        log.error("业务异常: ", e);
        return Result.error(e.getMessage());
    }

    /**
     * 兜底异常处理
     * <p>
     * 拦截所有未被上述处理器匹配的异常，返回 500
     */
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Result<Void> handleException(Exception e) {
        log.error("系统异常: ", e);
        return Result.error("服务器内部错误");
    }
}

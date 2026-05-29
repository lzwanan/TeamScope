import axios from 'axios';
import type { ApiResult } from '@/shared/types';

/**
 * 统一 HTTP 请求实例
 * <p>
 * 配置了 baseURL、超时时间、请求/响应拦截器。
 * 所有 API 调用共用此实例，确保错误处理、Token 注入等逻辑统一。
 */

const request = axios.create({
  baseURL: '/api/v1',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// 响应拦截：统一提取 data
request.interceptors.response.use(
  (response) => {
    const result = response.data as ApiResult;
    if (result.code !== 200) {
      return Promise.reject(new Error(result.message || '请求失败'));
    }
    return response;
  },
  (error) => {
    const msg = error.response?.data?.message || error.message || '网络错误';
    return Promise.reject(new Error(msg));
  }
);

export default request;

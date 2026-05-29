package com.teamscope.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 分页查询统一响应
 * <p>
 * 用于列表查询的分页场景，包含总记录数、当前页数据和当前页码/每页条数
 *
 * @param <T> 列表元素类型
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PageResult<T> {

    /** 总记录数 */
    private long total;

    /** 当前页数据列表 */
    private java.util.List<T> records;

    /** 当前页码（1-based） */
    private long page;

    /** 每页条数 */
    private long size;
}

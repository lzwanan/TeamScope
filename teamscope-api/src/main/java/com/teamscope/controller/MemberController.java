package com.teamscope.controller;

import com.alibaba.excel.EasyExcel;
import com.teamscope.common.PageResult;
import com.teamscope.common.Result;
import com.teamscope.dto.MemberDTO;
import com.teamscope.dto.MemberSaveDTO;
import com.teamscope.service.MemberService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

/**
 * 团队成员 REST 接口
 * <p>
 * 路径前缀: /api/v1/members
 * 提供成员的 CRUD、分页查询、Excel 导入导出
 */
@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    /**
     * 分页查询成员列表
     * <p>
     * 支持按角色编码筛选，按姓名/邮箱关键词模糊搜索
     *
     * @param page     页码（1-based），默认 1
     * @param size     每页条数，默认 10
     * @param roleCode 角色编码筛选，可选
     * @param keyword  搜索关键词（匹配姓名或邮箱），可选
     */
    @GetMapping
    public Result<PageResult<MemberDTO>> page(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String roleCode,
            @RequestParam(required = false) String keyword) {
        PageResult<MemberDTO> result = memberService.pageMembers(page, size, roleCode, keyword);
        return Result.ok(result);
    }

    /**
     * 获取成员详情
     *
     * @param id 成员ID
     */
    @GetMapping("/{id}")
    public Result<MemberDTO> getById(@PathVariable Long id) {
        MemberDTO member = memberService.getMemberById(id);
        return Result.ok(member);
    }

    /**
     * 新增成员
     *
     * @param dto 成员信息，通过 @Valid 触发参数校验
     */
    @PostMapping
    public Result<MemberDTO> add(@Valid @RequestBody MemberSaveDTO dto) {
        MemberDTO member = memberService.addMember(dto);
        return Result.ok(member);
    }

    /**
     * 更新成员
     *
     * @param id  成员ID
     * @param dto 要更新的成员信息
     */
    @PutMapping("/{id}")
    public Result<MemberDTO> update(@PathVariable Long id, @Valid @RequestBody MemberSaveDTO dto) {
        MemberDTO member = memberService.updateMember(id, dto);
        return Result.ok(member);
    }

    /**
     * 删除成员
     *
     * @param id 成员ID
     */
    @DeleteMapping("/{id}")
    public Result<Void> delete(@PathVariable Long id) {
        memberService.removeById(id);
        return Result.ok();
    }

    /**
     * 导出全部成员为 Excel 文件
     * <p>
     * 使用 EasyExcel 流式写出，文件名含中文需 URLEncoder 编码
     * 响应 Content-Type 设为 Excel MIME 类型，浏览器自动触发下载
     *
     * @param response HttpServletResponse，直接写入输出流
     */
    @GetMapping("/export")
    public void exportExcel(HttpServletResponse response) throws IOException {
        List<MemberDTO> list = memberService.exportAllMembers();

        // 设置响应头，告知浏览器这是一个 Excel 下载文件
        response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        response.setCharacterEncoding("utf-8");
        String fileName = URLEncoder.encode("团队成员列表", StandardCharsets.UTF_8).replace("+", "%20");
        response.setHeader("Content-Disposition", "attachment; filename=" + fileName + ".xlsx");

        EasyExcel.write(response.getOutputStream(), MemberDTO.class)
                .sheet("团队成员")
                .doWrite(list);
    }

    /**
     * 从 Excel 文件批量导入成员
     * <p>
     * 读取上传的 .xlsx 文件，逐行解析为 MemberSaveDTO，
     * 校验角色是否存在后批量插入
     *
     * @param file 上传的 Excel 文件，前端使用 multipart/form-data
     * @return 成功导入的条数
     */
    @PostMapping("/import")
    public Result<String> importExcel(@RequestParam("file") MultipartFile file) throws IOException {
        List<MemberSaveDTO> list = EasyExcel.read(file.getInputStream())
                .head(MemberSaveDTO.class)
                .sheet()
                .doReadSync();
        int count = memberService.importMembers(list);
        return Result.ok("成功导入 " + count + " 条成员数据");
    }
}

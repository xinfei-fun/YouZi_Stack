<!--
 * @Author: felixzhou9191 felixzhou9191@gmail.com
 * @Date: 2025-03-24 23:35:07
 * @LastEditors: felixzhou9191 felixzhou9191@gmail.com
 * @LastEditTime: 2025-03-24 23:47:02
 * @FilePath: \YouZi_Stack\src\blog\basic\浏览器从输入Url到页面渲染.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
# VitePress 的 Frontmatter 配置
title: URL 的组成结构
description: 详解网络地址的各个组成部分
---

# URL 的构成要素

## 基本格式
```text
  https://www.example.com:8080/path/to/page?name=Alice&age=20#section1
  \___/   \_____________/ \__/\_____________/ \___________/ \_______/
    |           |           |       |               |           |
  协议    域名/主机名     端口号    路径          查询参数    片段标识符
```

## 各组成部分详解

### 1. 协议（Protocol）
- 定义通信规则（如 `http`, `https`, `ftp`）
- 示例：`https://`（加密的 HTTP 协议）

### 2. 域名（Domain）
- 层级结构：
  ```text
  www    . example  . com  . 
  └─子域名   └─主域名    └─顶级域
  ```

### 3. 端口（Port）
- 默认端口自动隐藏：
  - HTTP → 80
  - HTTPS → 443
- 显式示例：`:8080`

### 4. 路径（Path）
- 使用 `/` 分隔层级：
  ```markdown
  /articles/2023/url-guide.html
  ```

### 5. 查询参数（Query Parameters）
- 格式规则：
  - 以 `?` 开始
  - `key=value` 键值对
  - 多个参数用 `&` 连接
  ```markdown
  ?category=tech&page=2
  ```

### 6. 片段标识符（Fragment）
- 定位页面内锚点：
  ```markdown
  #chapter2
  ```

## 完整示例解析
```javascript
// 浏览器解析示例
const url = new URL('https://www.xinfei.fun:443/docs/network?type=guide#http');
console.log(url.protocol);  // → "https:"
console.log(url.hostname);  // → "www.xinfei.fun"
console.log(url.pathname);  // → "/docs/network"
console.log(url.search);    // → "?type=guide"
console.log(url.hash);      // → "#http"
```

> 提示：可通过浏览器开发者工具的 **Network** 面板观察实际请求的 URL 结构

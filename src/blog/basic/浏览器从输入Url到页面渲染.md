<!--
 * @Author: felixzhou9191 felixzhou9191@gmail.com
 * @Date: 2025-03-24 23:35:07
 * @LastEditors: felixzhou9191 felixzhou9191@gmail.com
 * @LastEditTime: 2025-03-25 23:10:34
 * @FilePath: \YouZi_Stack\src\blog\basic\浏览器从输入Url到页面渲染.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->

# 浏览器从输入Url到页面渲染

## 前言

浏览器从输入Url到页面渲染的过程，涉及到网络、浏览器、服务器等多个环节，本文将完整介绍这一过程。

通过本篇的学习，你将：

- [x] 掌握 URL 各组成部分的含义
- [x] 理解DNS域名解析的过程
- [x] 理解TCP/IP协议的工作过程
- [x] 理解HTTP协议的工作过程
- [x] 理解浏览器渲染页面的过程（下一篇）

## URL 的组成

### 基本格式
```text
  https://www.example.com:8080/path/to/page?name=Youzi&age=20#section1
  \___/   \_____________/ \__/\___________/ \______________/ \_______/
    |           |           |       |               |           |
  协议    域名/主机名     端口号    路径          查询参数        锚点
```

### 各组成部分详解

#### 1. 协议（Protocol）
URL的开头部分，用于指定访问资源时所使用的通信协议。
- 定义通信规则（如 `http`, `https`, `ftp`）
- 示例：`https://`（加密的 HTTP 协议）

#### 2. 域名（Domain）
- 由一串用点分隔的单词组成，通常最后一个词表示域名的顶级域（TLD）
- 层级结构：
  ```text
  www    . example  . com  . 
  └─子域名   └─主域名    └─顶级域
  ```

#### 3. 端口（Port）
用于区分同一服务器上的不同服务，不同的服务通常使用不同的端口号。HTTP的默认端口是80，而HTTPS的默认端口是443。
- 端口号范围：0~65535
- 默认端口自动隐藏：
  - HTTP → 80
  - HTTPS → 443
- 省略默认端口：
  - HTTP → `http://www.example.com`
  - HTTPS → `https://www.example.com`
- 省略非标准端口：
  - HTTP → `http://www.example.com:80`


#### 4. 路径（Path）
 用于指定访问资源的路径，通常以 `/` 开始，表示当前所在的目录
- 使用 `/` 分隔层级：
  ```markdown
  /articles/2023/url-guide.html
  ```

#### 5. 查询参数（Query Parameters）
用于指定附加信息，如搜索词、分页信息等
- 格式规则：
  - 以 `?` 开始
  - `key=value` 键值对
  - 多个参数用 `&` 连接
  ```markdown
  ?category=tech&page=2
  ```

#### 6. 锚点或片段标识符（Fragment）
用于定位页面内的特定位置
- 定位页面内锚点：
  ```markdown
  #chapter2
  ```

### 完整示例解析
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

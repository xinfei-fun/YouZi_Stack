---
order: 4.1
---

# 你不知道的 Hashbang 注释

在使用 husky 等工具或者在unix 系统中，我们有时候会看到下面这串字符：

```bash
#!/bin/bash
```

它通常出现在第一行，看上去好像没啥用？那么它具体是什么呢？今天我们来详细来探讨下！🥰

这种注释叫 `Hashbang 注释` , 这是一种特殊的注释语法，其行为与单行注释（//）完全一样，只是它以 `#!` 开头，并且只在脚本或模块的最开始处有效

::: tip 提示
注意，`#!` 标志必须位于第一行且前后都不能由空格。注释由 `#!` 之后的所有字符组成直到第一行的末尾；只允许有一条这样的注释
:::

这个注释的目的是提供了一个特定的 JavaScript/bash/python 解释器的路径，表示你想用该路径的解释器来执行该代码。

早在这个注释标准出来之前，在 Node 环境，这种注释已经成为事实上的标准。

## window 上是如何识别这种注释的？

咋一看，这种路径似乎是unix 系统上的，而且 window 上好像也没有bash？

是的，在 Windows 原生环境中，Hashbang 注释确实不会被原生支持，但这并不意味着完全不可用！有一些工具能在 Windows 中做到兼容：

1. Git Bash（Windows 自带的 Git 安装选项）
2. WSL（Windows Subsystem for Linux）
3. Cygwin/MSYS（模拟 Unix 环境）   

这些环境会识别 Hashbang，并调用正确的解释器（如 sh、node、python）。

因此，我们在安装 Git 客户端时候，最好：

1. 勾选 "Use Git Bash"
2. 修改 Git 配置，`git config --global core.shell bash`

## 调整 Hashbang 路径

**Git Bash 的路径映射**

Git Bash（基于 MSYS2/Cygwin）会将 Unix 风格的路径（如 /bin/bash）自动映射到 Windows 的安装目录。
例如，如果你将 Git 安装在 D:\Program Files\Git，则：

Unix 路径 `/bin/bash`
实际指向 → `D:\Program Files\Git\usr\bin\bash.exe` （注意不是 /bin，而是 /usr/bin，这是 MSYS2 的路径设计）

因此，我们在写这种注释的时候，还是要遵循 unix 下的写法，千万不要用window 路径：
```bash
#!/d/Program Files/Git/bin/bash   # 错误写法！
```

验证路径映射
在 Git Bash 中运行以下命令，查看实际路径：

```bash
# 查询 bash 的真实路径
which bash      # 输出：/usr/bin/bash
$ where bash    # 输出：D:\software\Git\usr\bin\bash.exe
```

## 推荐写法

```
#!/usr/bin/env bash
```

### env 的作用

**env 是一个 Unix/Linux 命令**，用于在环境变量 PATH 中查找指定程序的位置并执行。
例如，执行 env bash 时，env 会从系统的 PATH 环境变量中查找 bash 的路径，然后调用它。

当脚本以 #!/usr/bin/env bash 开头时，操作系统会：

1. 找到 /usr/bin/env 这个程序（几乎所有 Unix/Linux/macOS 系统中都存在）。
2. 让 env 从当前环境的 PATH 变量中查找 bash 的位置。
3. 调用找到的 bash 来执行脚本。

这种写法可以避免硬编码，用这种写法是跨平台中比较好的实践。
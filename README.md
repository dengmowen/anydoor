# anydoor

NodeJs Static Web Server

## 使用方法

npm i -g supervisor

### range 范围

### 缓存

Expires
Cache-Control
IF-Modified-Since / Last-MOdified 开始修改时间/ 结束修改时间
IF-None-Match / ETag hash 算法

### 安装

```
npm i -g anydoor
```

### 使用方法

```
anydoor  #把当前文件作为静态资源服务器根目录

anydoor -p 8000 #设置端口号为8080

anyDOOR -h localhost #设置host为localhost

anydoor - d /usr  #设置根目录为user
```

赋值可执行权限
chmod +x anydoor
查看权限
ll anydoor

---
title: '将 node 项目发布到 heroku'
date: '2022-01-04'
---

# 将 node 项目发布到 heroku

## create-react-app 环境变量配置

build 到其他目录

```
BUILD_PATH=../server/public
```

使用 fetch 请求数据，使用绝对地址（本地和发布环境要区分）：

```
REACT_APP_API_URL=https://cyh-trello-clone.herokuapp.com
```

环境变量配置详见文档：[https://create-react-app.dev/docs/adding-custom-environment-variables/](https://create-react-app.dev/docs/adding-custom-environment-variables/)

## 发布到 heroku

1. 登陆

```bash
heroku login -i
# 加-i可以使用账号密码登陆，网页授权可能会因为网络问题失败
```

2. 添加 Procfile 文件

```bash
web:npm run start
# 就是启动node项目的script命令
```

3. 在 heroku 网站上新建一个项目

4. 添加远程分支

```
heroku git:remote -a cyh-trello-clone
```

5. 因为我的项目分为 client 和 server，发布的是 server 子目录

```bash
git subtree push --prefix server heroku main
```

6. 查看日志

```bash
heroku logs --tail
```

7. 注意事项
   node 的环境变量需要在 heroku 网站上配置

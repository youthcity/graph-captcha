# 图形验证码服务接入示例

## 主要服务商

- [极验 - 行为验证](https://docs.geetest.com/install/overview/start/)
- [腾讯防水墙](https://007.qq.com/)
- [腾讯天御 - 验证码服务](https://cloud.tencent.com/document/api/295/6703)
- [阿里云云盾 - 数据风控之人机验证](https://help.aliyun.com/document_detail/66324.html?spm=a2c4g.11186623.6.555.71d31302taBKI3)

## 项目配置

1）创建 `.env` 文件
```
cp .env.example .env
```

2）添加相应配置
```
# 端口
# 请勿修改此端口值
PORT = 4000

# 极验配置
# 输入自己的极验配置
GEETEST_ID = XXXX
GEETEST_KEY = XXX

# 防水墙配置
# 输入自己的waterproof-wall
WATERPROOF_WALL_AID = XXXX
WATERPROOF_WALL_SECRET_KEY = XXXX
```

## 项目启动

```
yarn install

yarn start // 或 npm start
```

## 体验地址

1）测试极验

http://127.0.0.1:4000/geetest.html

2）测试防水墙

http://127.0.0.1:4000/007.html

3) 测试腾讯天御

http://127.0.0.1:4000/t.html
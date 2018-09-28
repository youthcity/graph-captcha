import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as session from 'koa-session';
import path = require('path');

require('env2')('.env');

import * as geetest_controller from './geetest/controller';
import * as waterproof_wall_controller from './waterproof_wall/controller';
import * as tianyu_controller from './tencent/controller';

const app = new Koa();
const router = new Router();

const staticPath = './static';

app.use(bodyParser());

// `signed: false` disable cookie signatures
// app.use(session({ signed: false }, app));

// or set key
app.keys = ['youthcity'];
app.use(session(app));

app.use(serve(
  path.join(__dirname, staticPath),
));

router.get('/', (ctx, next) => {
  ctx.body = 'hello world';
});

// 【极验】 API 1 —— 获取验证流水
router.get('/geetest/register', geetest_controller.register);

// 【极验】 API 2 —— 二次验证
router.get('/geetest/validate', geetest_controller.validate);

// 【防水墙】 验证
router.get('/waterproof-wall/validate', waterproof_wall_controller.validate);

// 【天御】获取 JS SDK URL
router.get('/tianyu/js-sdk', tianyu_controller.generate_js_sdk_url);

// 【天御】校验ticket 合法性
router.get('/tianyu/verify', tianyu_controller.verify);

app.use(router.routes())
  .use(router.allowedMethods());

const { PORT } = process.env;

app.listen(PORT);
console.log(`app started at  http://localhost:${PORT} `);
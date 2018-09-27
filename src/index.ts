import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';
import * as session from 'koa-session';
import path = require('path');

require('env2')('.env');

import * as geetest_controller from './geetest/controller';

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


app.use(router.routes())
  .use(router.allowedMethods());


const { PORT } = process.env;

app.listen(PORT);
console.log(`app started at  http://localhost:${PORT} `);
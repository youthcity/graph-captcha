import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as serve from 'koa-static';

import path = require('path');

const PORT = 4000;

const app = new Koa();
const router = new Router();

const staticPath = '../static';

app.use(bodyParser());
app.use(serve(
  path.join(__dirname, staticPath),
));

router.get('/', (ctx, next) => {
  ctx.body = 'hello world';
});

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(PORT);
console.log(`app started at  http://localhost:${PORT} `);
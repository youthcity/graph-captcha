import { TianyuClient } from './client';

const { env } = process;

if (env.TIANYU_ID == null || env.TIANYU_KEY == null || env.TIANYU_REGION == null) {
  throw new Error('please set tianyu config in .env');
}

const Client = new TianyuClient({
  SecretId: env.TIANYU_ID,
  SecretKey: env.TIANYU_KEY,
});

export const generate_js_sdk_url = async (ctx:any, next:any) => {
  const { captchaType = 9, disturbLevel = 1, isHttps = 1, clientType = 2, accountType = 0 } = ctx.query;

  const params = {
    captchaType,
    disturbLevel,
    isHttps,
    clientType,
    accountType,
  };

  const url = await Client.generate_js_sdk_url(params);

  ctx.body = { url };
};

export const verify = async (ctx:any, next:any) => {
  const { ticket, accountType = 0, captchaType =9 } = ctx.query;

  const user_ip = ctx.ip.replace(/^::ffff:/, '');

  const is_pass = await Client.verify({
    ticket,
    accountType,
    captchaType,
    userIp: user_ip,
  });

  ctx.body = { is_pass };
};
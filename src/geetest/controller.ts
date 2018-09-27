import { GeetestClient } from './geetest_client';

const { env } = process;

if (env.GEETEST_ID == null || env.GEETEST_KEY == null) {
  throw new Error('Please write the config into the .env file!');
}

const Client = new GeetestClient({
  geetest_id: env.GEETEST_ID,
  geetest_key: env.GEETEST_KEY,
});

export const register = async (ctx:any, next:any) => {
  const result = await Client.register();

  if (result.success === 0) {
    ctx.session.is_fallback = true;
  }

  ctx.body = result;
};

export const validate = async (ctx:any, next:any) => {
  const { geetest_challenge, geetest_validate, geetest_seccode } = ctx.query;
  const is_fallback = ctx.session.is_fallback ? true : false;
  console.log(ctx.session.is_fallback);
  const is_pass = await Client.validate(is_fallback, {
    geetest_challenge,
    geetest_validate,
    geetest_seccode,
  });
  ctx.body = { is_pass };
};
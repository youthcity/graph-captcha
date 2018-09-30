import { AliAFS } from './client';

const { env } = process;

if (env.ALI_ACCESS_KEY_ID == null || env.ALI_ACCESS_KEY_SECRET == null) {
  throw new Error('please set config in .env');
}

const Client = new AliAFS({
  access_key_id: env.ALI_ACCESS_KEY_ID,
  access_key_secret: env.ALI_ACCESS_KEY_SECRET,
});

export const verify = async (ctx:any, next:any) => {
  const { SessionId, Token, Sig, Scene = 'nc_login', AppKey } = ctx.query;

  const user_ip = ctx.ip.replace(/^::ffff:/, '');

  const params = {
    SessionId,
    Token,
    Sig,
    Scene,
    AppKey,
    RemoteIp: user_ip,
  };

  const is_pass = await Client.verify(params);
  ctx.body = { is_pass };
};
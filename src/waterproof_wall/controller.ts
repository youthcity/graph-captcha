import { WaterproofWallClient } from './waterproof_wall_client';

const { env } = process;

if (env.WATERPROOF_WALL_AID == null || env.WATERPROOF_WALL_SECRET_KEY == null) {
  throw new Error('Please write WATERPROOF_WALL config into the .env file!');
}

const WaterClient = new WaterproofWallClient({
  aid: env.WATERPROOF_WALL_AID,
  secret_key: env.WATERPROOF_WALL_SECRET_KEY,
});

export const validate = async (ctx:any, next:any) => {
  const { ticket, randstr } = ctx.query;
  const user_ip = ctx.ip.replace(/^::ffff:/, '');

  const is_pass = await WaterClient.verify({ ticket, randstr, user_ip });
  ctx.body = { is_pass };
};

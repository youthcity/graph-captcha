const Geetest = require('gt3-sdk');

export interface Config {
  geetest_id:string;    // 申请到的ID
  geetest_key:string;   // 申请到的私钥
}

export enum ClientType {
  WEB = 'web',
  H5 = 'h5',
  NATIVE = 'native',
  UNKNOWN = 'unknown',
}

export interface RegisterParams {
  user_id?:string;
  client_type?:string;
  ip_address?:string|'unknnow';
}

export interface RegisterData {
  challenge:string;
  gt:string;
  new_captcha:boolean;
  success:number;
}

export interface ValidateParams {
  geetest_challenge:string;
  geetest_validate:string;
  geetest_seccode:string;
}

export class GeetestClient {
  private client:any;

  constructor(config:Config) {
    this.client = new Geetest({
      geetest_id: config.geetest_id,
      geetest_key: config.geetest_key,
    });
  }

  public async register(params?:RegisterParams) : Promise<RegisterData> {
    return new Promise<RegisterData>((reslove, reject) => {
      this.client.register(params, (err:any, data:RegisterData) => {
        if (err) {
          return reject(err);
        }

        return reslove(data);
      });
    });
  }

  public async validate(fallback:boolean, params:ValidateParams) : Promise<boolean> {
    return new Promise<boolean>((reslove, reject) => {
      return this.client.validate(fallback, {
        geetest_challenge: params.geetest_challenge,
        geetest_validate: params.geetest_validate,
        geetest_seccode: params.geetest_seccode,
      }, (err:any, success:boolean) => {
        if (err) {
          return reslove(false);
        }

        return reslove(success);
      });
    });
  }

}
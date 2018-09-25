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
  a:string;
}

export interface ValidateParams {

}

export class GeetestClient {
  private client:any;

  constructor(config:Config) {
    this.client = new Geetest({
      geetest_id: config.geetest_id,
      geetest_key: config.geetest_id,
    });
  }

  public async register(params?:RegisterParams) : Promise<any> {
    return new Promise((reslove, reject) => {
      this.client.register(params, (err:any, data:RegisterData) => {
        if (err) {
          return reject(err);
        }

        return reslove(data);
      });
    });
  }

  public async validate(fallback:boolean, params:ValidateParams) : Promise<any> {
    return new Promise((reslove, reject) => {
      return this.client.validate(fallback, params, (err:any, success:boolean) => {
        if (err) {
          return reslove(false);
        }

        return reslove(success);
      });
    });
  }

}
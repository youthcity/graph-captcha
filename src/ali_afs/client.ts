const RPCClient = require('@alicloud/pop-core').RPCClient;

export interface Config {
  access_key_id:string;
  access_key_secret:string;
}

export interface VerifyParams {
  SessionId:string;
  Token?:string;
  Sig?:string;
  Scene?:string;
  Platform?:number;
  AppKey?:string;
  RemoteIp?:string;
}

export enum AFSCode {
  PASS = 100,
  UNPASS = 900,
}

export class AliAFS {
  private access_key_id:string;
  private access_key_secret:string;
  private client:any;

  constructor(config:Config) {
    this.access_key_id = config.access_key_id;
    this.access_key_secret = config.access_key_secret;

    this.client = new RPCClient({
      accessKeyId: this.access_key_id,
      accessKeySecret: this.access_key_secret,
      endpoint: 'http://afs.aliyuncs.com',
      apiVersion: '2018-01-12',
      codes: [100, 900],
    })
  }

  public async verify(params:VerifyParams) : Promise<boolean> {
    const ACTION_TYPE = 'AuthenticateSig';
    let is_pass = false;
    try {
      const res = await this.client.request(ACTION_TYPE, params);
      console.log(res);
      if (res && res.Code == AFSCode.PASS) {
        is_pass = true;
      }

    } catch (error) {
      console.log(error);
    }

    return is_pass;
  }


}
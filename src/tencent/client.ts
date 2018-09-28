import * as _ from 'lodash';
const Capi = require('qcloudapi-sdk');

const { env } = process;

export interface Config {
  SecretId:string;
  SecretKey:string;
}

export interface GenerateSDKParams {
  captchaType:number;
  disturbLevel:number;
  isHttps:number;
  clientType:number;
  accountType:number;
}

export interface VerityParams {
  userIp:string;
  accountType:number;
  captchaType:number;
  ticket:string;
}

export interface VerifyTicketResponse {
  code:number;
  codeDesc:string;
  level:number;
  message:string;
  ticketTimestamp:number;
}

export class TianyuClient {
  private client:any;
  private region:string;

  constructor(config:Config) {
    this.client = new Capi({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
      serviceType: 'csec',
      method: 'get',
    });

    this.region = env.TIANYU_REGION || 'gz';
  }

  private async request (params:any) : Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.request(params, (error:any, data:any) => {
        if (error) {
          return reject(error);
        }
  
        return resolve(data);
      });
    });
  }

  public async generate_js_sdk_url (params:GenerateSDKParams) {
    return this.request({
      Region: this.region,
      Action: 'CaptchaIframeQuery',
      ...params,
    });
  }

  public async verify (params:VerityParams) {
    let res:VerifyTicketResponse;
    try {
      res = await this.request({
        Region: this.region,
        Action: 'CaptchaCheck',
        ...params,
      });
    } catch (error) {
      return false;
    }

    if (_.isNil(res) || _.isNil(res.code) || res.code !== 0) {
      return false;
    }

    return true;
  }

}
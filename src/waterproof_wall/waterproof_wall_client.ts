import * as superagent from 'superagent';
import * as _ from 'lodash';

export interface Config {
  aid:string;
  secret_key:string;
}

export interface VerifyParams {
  ticket:string;
  randstr:string;
  user_ip:string;
}

export class WaterproofWallClient {
  private aid:string;
  private secret_key:string;
  private base_URL:string;

  constructor(config:Config) {
    this.aid = config.aid;
    this.secret_key = config.secret_key;

    this.base_URL = 'https://ssl.captcha.qq.com/ticket/verify';
  }

  public async verify(params:VerifyParams) {
    const response = await superagent
      .get(this.base_URL)
      .query({
        aid: this.aid,
        AppSecretKey: this.secret_key,
        Ticket: params.ticket,
        Randstr: params.randstr,
        UserIP: params.user_ip,
      })
      .send();

      const result = JSON.parse(response.text);

      const res_code = +(result.response);

      let is_pass = false;
      switch (res_code) {
        case 0:
          is_pass = false;
          break;

        case 1:
          is_pass = true;
          break;
      
        default:
          is_pass = false;
          break;
      }

      return is_pass;
  }
}
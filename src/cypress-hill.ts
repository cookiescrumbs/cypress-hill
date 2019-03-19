interface HashMapofAppConf {
  [key: string]: AppConf;
}

interface AppConf {
    baseUrl: string
}

export class CypressHill {

  private _baseUrl: string;
  private _env: string;

  constructor(conf: AppConf, env?: string | false) {
    this._baseUrl = conf.baseUrl;
    this._env = env || 'dev';
  }

  public open(): string {
    return `CYPRESS_environment=${this._env} CYPRESS_baseUrl=${this._replaceBaseUrlEnv()} ./node_modules/.bin/cypress open`;
  }

  public run(): string { 
    return `CYPRESS_environment=${this._env} CYPRESS_baseUrl=${this._replaceBaseUrlEnv()} ./node_modules/.bin/cypress run`;
  }

  private _replaceBaseUrlEnv(): string {
    return this._baseUrl.replace('{{env}}', this._env);
  }

}
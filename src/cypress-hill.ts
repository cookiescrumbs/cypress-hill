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
    return `${this._buildCommand()} open`;
  }

  public run(): string { 
    return `${this._buildCommand()} run`;
  }

  private _replaceBaseUrlEnv(): string {
    return this._baseUrl.replace('{{env}}', this._env);
  }

  private _envVar(): string { 
     return `CYPRESS_environment=${this._env}`
  }

  private _baseUrlVar(): string { 
    return `CYPRESS_baseUrl=${this._replaceBaseUrlEnv()}`;
  }

  private _cypressBinLocation(): string { 
    return './node_modules/.bin/cypress';
  }

  private _buildCommand(): string { 
    return `${this._envVar()} ${this._baseUrlVar()} ${this._cypressBinLocation()}`;
  }

}
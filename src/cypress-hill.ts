import { AppConf } from './common/types';

enum ENVIRONMENTS {
  LIVE = 'live'
}

export class CypressHill {

  private _baseUrl: string;
  private _spec: string | undefined;
  private _env: string;

  constructor(conf: AppConf, env?: string) {
    this._baseUrl = conf.baseUrl;
    this._spec = conf.specs;
    this._env = env || 'dev';
  }

  public open(): string {
    return `${this._buildCommand()} open`;
  }

  public run(): string { 
    console.log(`${this._buildCommand()} run${this._getSpec()}`);
    return `${this._buildCommand()} run${this._getSpec()}`;
  }

  private _replaceBaseUrlEnv(): string {
    if (this._env === ENVIRONMENTS.LIVE) { 
      return this._baseUrl.replace('{{env}}.','');
    }
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

  private _getSpec(): string {
    return (this._spec)? ` --spec '${this._spec}'` : '';
  }

}
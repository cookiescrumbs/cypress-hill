"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CypressHill {
    constructor(conf, env) {
        this._baseUrl = conf.baseUrl;
        this._env = env || 'dev';
    }
    open() {
        return `CYPRESS_environment=${this._env} CYPRESS_baseUrl=${this._replaceBaseUrlEnv()} ./node_modules/.bin/cypress open`;
    }
    run() {
        console.log(this._env);
        return `CYPRESS_environment=${this._env} CYPRESS_baseUrl=${this._replaceBaseUrlEnv()} ./node_modules/.bin/cypress run`;
    }
    _replaceBaseUrlEnv() {
        console.log();
        return this._baseUrl.replace('{{env}}', this._env);
    }
}
exports.CypressHill = CypressHill;
//# sourceMappingURL=cypress-hill.js.map
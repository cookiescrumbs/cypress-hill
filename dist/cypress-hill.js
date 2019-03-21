"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CypressHill {
    constructor(conf, env) {
        this._baseUrl = conf.baseUrl;
        this._env = env || 'dev';
    }
    open() {
        return `${this._buildCommand()} open`;
    }
    run() {
        return `${this._buildCommand()} run`;
    }
    _replaceBaseUrlEnv() {
        return this._baseUrl.replace('{{env}}', this._env);
    }
    _envVar() {
        return `CYPRESS_environment=${this._env}`;
    }
    _baseUrlVar() {
        return `CYPRESS_baseUrl=${this._replaceBaseUrlEnv()}`;
    }
    _cypressBinLocation() {
        return './node_modules/.bin/cypress';
    }
    _buildCommand() {
        return `${this._envVar()} ${this._baseUrlVar()} ${this._cypressBinLocation()}`;
    }
}
exports.CypressHill = CypressHill;
//# sourceMappingURL=cypress-hill.js.map
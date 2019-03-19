#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const shell = __importStar(require("shelljs"));
const cypress_hill_1 = require("./cypress-hill");
const conf = {
    teacher: {
        baseUrl: 'https://teacher.{{env}}.ctx.ef.com'
    }
};
`ch open teacher stage`;
const Console = console;
const [, , ...args] = process.argv;
const appConf = conf[args[1]];
const appEnv = args[2] || false;
const action = args[0];
const app = new cypress_hill_1.CypressHill(appConf, appEnv);
const cypressCommand = app[action]();
shell.exec(cypressCommand);
//# sourceMappingURL=cli.js.map
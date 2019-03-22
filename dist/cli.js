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
const fs = __importStar(require("fs"));
const cypress_hill_1 = require("./cypress-hill");
const Console = console;
const configLoc = 'src/__tests__/fixtures/ch.json';
const [, , ...args] = process.argv;
function readConfigFile(configLoc) {
    return new Promise((resolve, reject) => {
        fs.readFile(configLoc, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(data);
            }
        });
    });
}
function jsonParse(json) {
    return new Promise((resolve, reject) => {
        try {
            resolve(JSON.parse(json));
        }
        catch (error) {
            reject(error);
        }
    });
}
readConfigFile(configLoc)
    .then((blah) => {
    return jsonParse(blah);
})
    .then((conf) => {
    const appConf = conf[args[1]];
    const appEnv = args[2] || false;
    const action = args[0];
    const app = new cypress_hill_1.CypressHill(appConf, appEnv);
    const cypressCommand = app[action]();
    shell.exec(cypressCommand);
})
    .catch((error) => {
    Console.error(error.message);
});
//# sourceMappingURL=cli.js.map
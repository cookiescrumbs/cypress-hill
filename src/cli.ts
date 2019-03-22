#!/usr/bin/env node
import * as shell from 'shelljs';
import * as fs  from 'fs';
import {CypressHill} from './cypress-hill';

const Console = console;
const configLoc: string = 'src/__tests__/fixtures/ch.json';
const [, , ...args] = process.argv;

interface HashMapofAppConf {
    [key: string]: AppConf;
}

interface AppConf {
    baseUrl: string
}

function readConfigFile(configLoc: string) {
    return new Promise((resolve, reject) => {
        fs.readFile(configLoc, 'utf8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

function jsonParse(json: string): Promise<HashMapofAppConf> { 
    return new Promise((resolve, reject) => {
        try { 
           resolve(JSON.parse(json));
        } catch(error) {
            reject(error);
        }
    });
}

readConfigFile(configLoc)
.then((stringConfig) => {
    return jsonParse(stringConfig);
})
.then((conf) => {
    const appConf: AppConf = conf[args[1]];
    const appEnv: string | false = args[2] || false;
    const action: string = args[0];
    const app = new CypressHill(appConf, appEnv);
    const cypressCommand: string  = app[action]();
    shell.exec(cypressCommand);
})
.catch((error) => {
    Console.error(error.message);
});



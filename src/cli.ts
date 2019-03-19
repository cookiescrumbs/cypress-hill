#!/usr/bin/env node
import * as shell from 'shelljs';
import {CypressHill} from './cypress-hill';

interface HashMapofAppConf {
    [key: string]: AppConf;
}

interface AppConf {
    baseUrl: string
}

const conf: HashMapofAppConf = {
    teacher: {
        baseUrl: 'https://teacher.{{env}}.ctx.ef.com'
    }
};

`ch open teacher stage`

const Console = console;
const [, , ...args] = process.argv;
const appConf: AppConf = conf[args[1]];
const appEnv: string | false = args[2] || false;
const action: string = args[0];
const app = new CypressHill(appConf, appEnv);
const cypressCommand: string  = app[action]();

shell.exec(cypressCommand);


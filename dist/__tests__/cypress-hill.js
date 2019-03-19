"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cypress_hill_1 = require("../cypress-hill");
describe('CypressHill', () => {
    const conf = {
        baseUrl: 'https://blah.{{env}}.blah.com'
    };
    describe('.open()', () => {
        test('returns string containing baseurl, default "dev" environment', () => {
            const ch = new cypress_hill_1.CypressHill(conf);
            expect(ch.open()).toBe(`CYPRESS_environment=dev CYPRESS_baseUrl=https://blah.dev.blah.com ./node_modules/.bin/cypress open`);
        });
    });
    describe('.open("stage")', () => {
        test('return string containing the stage environment, stage baseurl and the open command', () => {
            const ch = new cypress_hill_1.CypressHill(conf, 'stage');
            expect(ch.open()).toBe('CYPRESS_environment=stage CYPRESS_baseUrl=https://blah.stage.blah.com ./node_modules/.bin/cypress open');
        });
    });
    describe('.run()', () => {
        test('return string containing the baseUrl, default "dev" environment and the run command', () => {
            const ch = new cypress_hill_1.CypressHill(conf);
            expect(ch.run()).toBe('CYPRESS_environment=dev CYPRESS_baseUrl=https://blah.dev.blah.com ./node_modules/.bin/cypress run');
        });
    });
    describe.only('.run("stage")', () => {
        test('return string containing the baseUrl, stage baseurl, environment and the run command', () => {
            const ch = new cypress_hill_1.CypressHill(conf, 'stage');
            expect(ch.run()).toBe('CYPRESS_environment=stage CYPRESS_baseUrl=https://blah.stage.blah.com ./node_modules/.bin/cypress run');
        });
    });
});
//# sourceMappingURL=cypress-hill.js.map
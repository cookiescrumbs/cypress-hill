import {CypressHill} from '../cypress-hill';
import { AppConf } from '../common/types';

let conf: AppConf; 

describe('CypressHill', () => {

    beforeEach(() => {
        conf = {
            baseUrl: 'https://blah.{{env}}.blah.com',
            specs: './e2e/cypress/integration/blah/blah/**/*'
        };
    });
    
    
    describe('.open()', () => {
        test('returns string containing baseurl, default "dev" environment', () => {
            const ch = new CypressHill(conf);
            expect(ch.open()).toBe(`CYPRESS_environment=dev CYPRESS_baseUrl=https://blah.dev.blah.com ./node_modules/.bin/cypress open`);
        });
    });

    describe('.open("stage")', () => {
        test('return string containing the stage environment, stage baseurl and the open command', () => {
            const ch = new CypressHill(conf, 'stage');
            expect(ch.open()).toBe('CYPRESS_environment=stage CYPRESS_baseUrl=https://blah.stage.blah.com ./node_modules/.bin/cypress open');
        });
    });

    describe('.open("live")', () => {
        test('return string containing the live environment, live baseurl and the open command', () => {
            const ch = new CypressHill(conf, 'live');
            expect(ch.open()).toBe('CYPRESS_environment=live CYPRESS_baseUrl=https://blah.blah.com ./node_modules/.bin/cypress open');
        });
    });

    describe('.run()', () => {
        test('return string containing the baseUrl, default "dev" environment and the run command', () => {
            const ch = new CypressHill(conf);
            expect(ch.run()).toBe("CYPRESS_environment=dev CYPRESS_baseUrl=https://blah.dev.blah.com ./node_modules/.bin/cypress run --spec './e2e/cypress/integration/blah/blah/**/*'");
        });
    });

    describe('.run("stage")', () => {
        test('return string containing the baseUrl, stage baseurl, environment, driectory to the specs and the run command', () => {
            const ch = new CypressHill(conf, 'stage');
            expect(ch.run()).toBe("CYPRESS_environment=stage CYPRESS_baseUrl=https://blah.stage.blah.com ./node_modules/.bin/cypress run --spec './e2e/cypress/integration/blah/blah/**/*'");
        });
    });

    describe('config has no spec location', () => {
        beforeEach(() => {
           conf= {
                baseUrl: 'https://blah.{{env}}.blah.com'
            };
        });

        describe('.run()', () => {
            test('return run command without the location to the specs', () => {
                const ch = new CypressHill(conf);
                expect(ch.run()).toBe('CYPRESS_environment=dev CYPRESS_baseUrl=https://blah.dev.blah.com ./node_modules/.bin/cypress run');
            });
        });
    });

    
});



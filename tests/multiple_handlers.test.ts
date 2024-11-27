import { test, expect } from '@jest/globals'

import Overseer from '..';

test(
    'generic error handler fallback',
    async () => {
        let handler1Done = false;
        let handler2Done = false;
        let handler3Done = false;

        const overseer = new Overseer();


        overseer.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("error:");
                },
                handle: () => {
                    handler1Done = true;
                }
            }
        );

        overseer.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("error:");
                },
                handle: () => {
                    handler2Done = true;
                }
            }
        );

        

        overseer.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("error:");
                },
                handle: () => {
                    handler3Done = true;
                }
            }
        );
      
        let actionExecuted = false;
        overseer.watch(
            () => {
                console.log("Hello World");

                actionExecuted = true;
                throw "error: Candles are not updated"
            }
        );

        expect(actionExecuted).toBe(true);

        expect(handler1Done).toBe(true);

        expect(handler2Done).toBe(true);
        
        expect(handler3Done).toBe(true);

    }
);


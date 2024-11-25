import { test, expect } from '@jest/globals'

import {ErrorHandlerService} from '..';

test(
    'generic error handler fallback',
    async () => {
        let errorHandled = false;

        const errorHandlerService = new ErrorHandlerService();

        errorHandlerService.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("candle_update_error:");
                },
                handle: () => {
                    errorHandled = true;
                }
            }
        );

      
        let actionExecuted = false;
        errorHandlerService.watch(
            () => {
                console.log("Hello World");

                actionExecuted = true;
                throw "candle_update_error: Candles are not updated"
            }
        );

        expect(actionExecuted).toBe(true);

        expect(errorHandled).toBe(true);
    }
);


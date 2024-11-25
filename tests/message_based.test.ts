import { test, expect } from '@jest/globals'

import {ErrorHandlerService} from '..';

test(
    'generic error handler fallback',
    async () => {
        let candleErrorHandled = false;
        let networkErrorHandled = false;

        const errorHandlerService = new ErrorHandlerService();


        errorHandlerService.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("network_error:");
                },
                handle: () => {
                    networkErrorHandled = true;
                }
            }
        );

        errorHandlerService.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("candle_update_error:");
                },
                handle: () => {
                    candleErrorHandled = true;
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

        expect(candleErrorHandled).toBe(true);

        expect(networkErrorHandled).toBe(false);

        errorHandlerService.watch(
            () => {
                throw "network_error: host cannot reached"
            }
        );
        

        await Bun.sleep(2000);
        expect(networkErrorHandled).toBe(true);

    }
);


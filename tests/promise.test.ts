import { test, expect } from '@jest/globals'

import {ErrorHandlerService} from '..';

test(
    'generic error handler fallback',
    async () => {
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

        let actionExecuted = false;

        errorHandlerService.watch(
            () => {
                return Bun.sleep(2000).then(
                    () => {
                        actionExecuted = true;
                        throw "network_error: host cannot reached";
                    }
                );
            }
        );
        


        expect(networkErrorHandled).toBe(false);
        await Bun.sleep(2000);

        expect(actionExecuted).toBe(true);
        expect(networkErrorHandled).toBe(true);

    }
);


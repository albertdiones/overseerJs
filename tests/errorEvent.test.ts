import { test, expect } from '@jest/globals'

import {ErrorHandlerService} from '..';

test(
    'generic error handler fallback',
    async () => {
        let errorHandled = false;

        const errorHandlerService = new ErrorHandlerService();


        expect(errorHandlerService).not.toBeFalsy();

        

        errorHandlerService.addErrorHandler(
            {
                qualify: (e) => {
                    return e.message.startsWith("error_occured:");
                },
                handle: () => {
                    errorHandled = true;
                }
            }
        );
      
        let actionExecuted = false;
        errorHandlerService.watch(
            () => {
                try {
                    console.log("Hello World");

                    actionExecuted = true;

                    errorHandlerService.dispatchError(
                        "error_occured: blah blah"
                    );
                }
                catch (e) {
                    // handle message
                    // throw e;
                }

                
            }
        );

        expect(actionExecuted).toBe(true);

        expect(errorHandled).toBe(true);
    }
);


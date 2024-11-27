import { test, expect } from '@jest/globals'

import {ErrorHandlerService} from '..';

test(
    'dispatch error event (instead of throwing)',
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

        let actionContinued = false;

        errorHandlerService.watch(
            () => {
                try {
                    console.log("Hello World");

                    actionExecuted = true;

                    errorHandlerService.dispatchError(
                        "error_occured: blah blah"
                    );
                    actionContinued = true;
                }
                catch (e) {
                    // handle message
                    // throw e;
                }

                
            }
        );

        expect(actionExecuted).toBe(true);

        expect(errorHandled).toBe(true);

        expect(actionContinued).toBe(true);
    }
);



test(
    'dispatch error object event (instead of string)',
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
        
        let actionContinued = false;


        errorHandlerService.watch(
            () => {
                try {

                    actionExecuted = true;

                    errorHandlerService.dispatchError(
                       new Error("error_occured: blah blah")
                    );
                    actionContinued = true;
                }
                catch (e) {
                    // handle message
                    // throw e;
                }

                
            }
        );

        expect(actionExecuted).toBe(true);

        expect(errorHandled).toBe(true);
        

        expect(actionContinued).toBe(true);
    }
);


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
                qualify: () => true,
                handle: () => {
                    console.log("I HAVE NOTHING!!");
                }
            }
        );

        errorHandlerService.addErrorHandler(
            {
                qualify: () => true,
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
                throw "error_occured: blah blah"
            }
        );

        expect(actionExecuted).toBe(true);

        expect(errorHandled).toBe(true);
    }
);


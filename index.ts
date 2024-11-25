
export interface ErrorHandler {
    qualify: (e: Error) => boolean;
    handle: (e: Error) => void;
}

export class ErrorHandlerService {

    errorHandlers: Array<any> = [];


    watch(action: () => Promise<any> | void) {
        try {
            const result = action();

            if (result instanceof  Promise) {
                result.catch( 
                    e => this.handleError(e)
                )
            }
        }
        catch (e: string | Error) {
            this.handleError(e);           
        }
    }

    handleError(e: string | Error) {
        const error = typeof e === 'string'
                ? new Error(e)
                : e;

        this.errorHandlers.forEach(
            (errorHandler) => {
                if (errorHandler.qualify(error)) {
                    errorHandler.handle(error);
                }
            }
        );
    }

    addErrorHandler(errorHandler: ErrorHandler) {
        this.errorHandlers.push(errorHandler);
    }
}
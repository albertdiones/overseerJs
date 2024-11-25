
export interface ErrorHandler {
    qualify: (e: Error) => boolean;
    handle: (e: Error) => void;
}

export class ErrorHandlerService {

    errorHandlers: Array<any> = [];


    watch(action: () => any) {
        try {
            action();
        }
        catch (e) {

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
    }

    addErrorHandler(errorHandler: ErrorHandler) {
        this.errorHandlers.push(errorHandler);
    }
}
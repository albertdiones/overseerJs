
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
            this.errorHandlers.forEach(
                (errorHandler) => {
                    if (errorHandler.qualify(e)) {
                        errorHandler.handle(e);
                    }
                }
            );
            
        }
    }

    addErrorHandler(errorHandler: ErrorHandler) {
        this.errorHandlers.push(errorHandler);
    }
}
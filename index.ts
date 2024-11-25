

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

    addErrorHandler(errorHandler:{}) {
        this.errorHandlers.push(errorHandler);
    }
}
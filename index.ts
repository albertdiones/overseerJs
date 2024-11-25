

export class ErrorHandlerService {

    errorHandlers: Array<any> = [];


    watch(action: () => any) {
        try {
            action();
        }
        catch (e) {
            this.errorHandlers.forEach(
                (errorHandler) => {
                    errorHandler.handle(e);
                }
            );
            
        }
    }

    addErrorHandler(errorHandler:{}) {
        this.errorHandlers.push(errorHandler);
    }
}
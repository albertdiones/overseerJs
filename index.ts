

export class ErrorHandlerService {

    errorHandler: Array<any> = [];


    watch(action: () => any) {
        try {
            action();
        }
        catch (e) {
            this.errorHandler.forEach(
                (errorHandler) => {
                    errorHandler.handle(e);
                }
            );
            
        }
    }

    addErrorHandler(errorHandler:{}) {
        this.errorHandler.push(errorHandler);
    }
}


export class ErrorHandlerService {

    errorHandler: Array<any> = [];


    watch(action: () => any) {
        try {
            action();
        }
        catch (e) {
            this.errorHandler[0].handle(e);
        }
    }

    addErrorHandler(errorHandler:{}) {
        this.errorHandler.push(errorHandler);
    }
}
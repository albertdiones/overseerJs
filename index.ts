

export class ErrorHandlerService {
    watch(action: () => any) {
        try {
            action();
        }
        catch (e) {
            
        }
    }
}
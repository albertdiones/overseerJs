
import { Event, EventContainer } from 'add_event_driven';

export interface ErrorHandler {
    qualify: (e: Error) => boolean;
    handle: (e: Error) => void;
}


export default class Overseer {

    errorHandlers: Array<any> = [];

    eventContainer: EventContainer;

    constructor() {
        this.eventContainer = new EventContainer();
    }


    watch(action: () => Promise<any> | void) {
        try {
            this.eventContainer.addEventListener(
                'error',
                (e: Event) => this.handleError(e.data?.error)
            );
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

    dispatchError(error:string | Error): void {
        this.eventContainer.dispatchEvent(
            new Event(
                'error',
                {
                    error: error
                }
            )
        );
    }
}

export const ErrorHandlerService = Overseer;
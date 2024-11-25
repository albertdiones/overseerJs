Error Handler Library with Event Driven support

A library that could allow us to declare error handlers, of specific errors

```
interface ErrorHandler {
   qualify(error): boolean {
    
   }
   handle|(error): void {
    
   }
}

const errorHandlerService = new ErrorHandlerService();

candleNotUpdatingError = {
  qualify(e) {
    return e.message.contains('candle_updates');
  }
  handle(e) {
     runService.addActiveInstrument(e.symbol);
  }
}

errorHandlerService.addErrorHandler(candleNotUpdatingError);


errorHandlerService.watch(
  () => // full root proces runs here
);
```
 

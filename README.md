overseerJs

function watcher with ff features:
 1. Custom error handling
 2. Event dispatch and handling support

A library that could allow us to declare error handlers, of specific errors

```
interface ErrorHandler {
   qualify(error): boolean {
    
   }
   handle|(error): void {
    
   }
}

const overseer = new Overseer();

candleNotUpdatingError = {
  qualify(e) {
    return e.message.contains('candle_updates');
  }
  handle(e) {
     runService.addActiveInstrument(e.symbol);
  }
}

overseer.addErrorHandler(candleNotUpdatingError);


overseer.watch(
  () => // full root proces runs here
);
```
 

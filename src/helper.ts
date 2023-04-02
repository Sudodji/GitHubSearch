function throttle<T extends (...args: any[]) => void>(func: T, ms: number): (...args: Parameters<T>) => void {
    let isThrottled = false;
    let savedArgs: Parameters<T> | undefined;
    let savedThis: any;
  
    function wrapper(this: any, ...args: Parameters<T>) {
      if (isThrottled) {
        savedArgs = args;
        savedThis = this;
        return;
      }
  
      func.apply(this, args);
      isThrottled = true;
  
      setTimeout(() => {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = undefined;
        }
      }, ms);
    }
  
    return wrapper;
  }

export default throttle;
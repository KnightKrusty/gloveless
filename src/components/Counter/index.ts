export function CounterLogic(initialCount: number) {
  let count = initialCount;

  function increment() {
    count++;
    notify();
  }

  function decrement() {
    count--;
    notify();
  }

  function getCount() {
    return count;
  }

  let listeners: (() => void)[] = [];

  function subscribe(listener: () => void) {
    listeners.push(listener);

    return function unsubscribe() {
      listeners = listeners.filter((l) => l !== listener);
    };
  }

  function notify() {
    listeners.forEach((listener) => listener());
  }

  return {
    increment,
    decrement,
    getCount,
    subscribe,
  };
}

import React, { useEffect, useState, ReactNode, ReactChild } from "react";
import { CounterLogic } from ".";

function useCounterLogic(initialCount: number) {
  const [count, setCount] = useState(initialCount);
  const counter = CounterLogic(count);

  useEffect(() => {
    const unsubscribe = counter.subscribe(() => {
      setCount(counter.getCount());
    });
    return () => unsubscribe();
  }, [counter]);

  return {
    count,
    increment: counter.increment,
    decrement: counter.decrement,
  };
}

type CounterProps = {
  children: ReactNode;
};

type CountProps = {
  count: number;
};

function Count({ count }: CountProps) {
  return <p>Count: {count}</p>;
}

type IncrementButtonProps = {
  increment: () => void;
};

type DecrementButtonProps = {
  decrement: () => void;
};

function DecrementButton({ decrement }: DecrementButtonProps) {
  return <button onClick={decrement}>decrement</button>;
}

function IncrementButton({ increment }: IncrementButtonProps) {
  return <button onClick={increment}>Increment</button>;
}

export const Counter = ({ children }: CounterProps) => {
  const counter = useCounterLogic(0);

  console.log(children);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        // @ts-ignore
        count: counter.count,
        increment: counter.increment,
        decrement: counter.decrement,
      });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

Counter.Count = Count;
Counter.Increment = IncrementButton;
Counter.Decrement = DecrementButton;

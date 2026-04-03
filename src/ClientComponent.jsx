"use client";

import { useState } from "react";

export default function ClientComponent() {
  const [counter, setCounter] = useState(0);
  return (
    <fieldset>
      <legend>Client Component</legend>
      <p>Counter: {counter}</p>
      <button onClick={(prev) => setCounter(prev + 1)}>Increment</button>
    </fieldset>
  );
}

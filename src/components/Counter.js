import React from "react";

export default function Counter({ count, setDisable }) {
  const [counter, setCounter] = React.useState(count);

  React.useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);

  if (counter === 0) setDisable(false);
  return <div>Send Again: {counter}</div>;
}

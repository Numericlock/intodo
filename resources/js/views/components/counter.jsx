import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);

    const addCount = () => {
        setCount((count) => count + 1);
    };

    return (
        <>
            <h2>Counter</h2>
            <p>Count:{count}</p>
            <button onClick={addCount}>Add</button>
        </>
    );
};

export default Counter;

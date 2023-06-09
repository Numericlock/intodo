import "./bootstrap";

import ReactDOM from "react-dom/client";
import Counter from "./components/counter";

function App() {
    return (
        <>
            <h1>Hello World</h1>
            <Counter />
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

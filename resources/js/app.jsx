import "./bootstrap";

import ReactDOM from "react-dom/client";
import { MantineProvider, Text } from '@mantine/core';
import Counter from "./components/counter";

function App() {
    return (
        <>
            <h1>Hello World</h1>
            <Counter />
            <MantineProvider withGlobalStyles withNormalizeCSS>
              <Text>Welcome to Mantine!</Text>
            </MantineProvider>
        </>
    );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

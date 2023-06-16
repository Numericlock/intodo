import "./bootstrap";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import "../css/app.css";
import "../css/mantineBase.css";
import Home from './pages/home';
import CategoryList from './pages/category_list';
import TaskList from './pages/task_list';
import Contact from './pages/contact';

function App() {
  return (
    <div className="flex items-center bg-gradient-to-br from-[#C6FFDD] via-[#FBD786] to-[#f7797d] h-screen">
      <div className="m-auto max-h-screen min-w-[420px] max-w-4xl p-6 glass-white rounded-lg">
        <MantineProvider
          theme={{
            components: {
              Modal: {
                styles: {
                  header: {
                    background: 'transparent',
                  },
                  close: {
                    color: 'black',
                    transitionDuration: '0.5s',
                    '&:hover': {
                      color: 'black',
                      backgroundColor: 'transparent',
                      transform: 'scale(1.5, 1.5)',
                      transitionDuration: '0.5s',
                    },
                  },
                  content: {
                    background: 'rgba( 255, 255, 255, 0.45 )',
                    boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
                    backdropFilter: 'blur( 1px )',
                    webkitBackdropFilter: 'blur( 1px )',
                    border: '1px solid rgba( 255, 255, 255, 0.18 )',
                  },
                },
              },
            },
          }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/categories" element={<CategoryList />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </BrowserRouter>
        </MantineProvider>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

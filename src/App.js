import './App.css';
import Main from "./components/main/main";
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from 'react-router-dom';
import Pnl from "./components/Functions/p_and_l_calculator/pnl";

function App() {
    const router = createBrowserRouter([
        {
            path: "/pnl",
            element: <Pnl/>,
        },
    ]);
    return (
        <div className="App">
            <Main></Main>
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;

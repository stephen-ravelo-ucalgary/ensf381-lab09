import "./App.css";
import {BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import HousePricePredictor from "./HousePricePredictor";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/predict" element={<HousePricePredictor />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

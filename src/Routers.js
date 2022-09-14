import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";

export default function Routers(){
    return (
        <BrowserRouter>
            <Routes>
                <Route  path="/" exact element={<Login />} />
                <Route path="/books"   element={<Books />} />
                <Route path="/book/new/:bookId"  element={<NewBook />} />
            </Routes>
        </BrowserRouter>
    );
}
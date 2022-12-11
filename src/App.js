import "./App.css";
import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Write from "./pages/Write";

const AppBlock = styled.div`
  position: relative;
  z-index: 1;
  background: #1e1e1e;
`;

export default function App() {
  return (
    <>
      <AppBlock>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/write/:id" element={<Write />} />
          </Routes>
        </BrowserRouter>
      </AppBlock>
    </>
  );
}

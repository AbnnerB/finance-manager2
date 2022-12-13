import { BrowserRouter, Routes, Route } from "react-router-dom";
import Manager from "./Pages/Manager";
import CreateManager from "./Pages/CreateManager";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<CreateManager />} />
          <Route path="/manager/:id" element={<Manager />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

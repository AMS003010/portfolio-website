import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/home";
//import Check from "./pages/check";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
          path="/portfolio-website"
          element={<Home />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter,Routes,Route } from "react-router-dom";

//import Home from "./pages/home";
import Check from "./pages/check";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
          path="/"
          element={<Check />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter,Routes,Route } from "react-router-dom";

//import Home from "./pages/home";
import HexagonAnimation from "./component/landing/lander";
import InProgress from "./component/inProgress/inProgress";
import Projects from "./pages/projects";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
            path="/portfolio-website"
            element={<HexagonAnimation />}
          />
          <Route
            path="/portfolio-website/home"
            element={<Projects />}
          />
          <Route
            path="/portfolio-website/end"
            element={<InProgress />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;

import { BrowserRouter,Routes,Route } from "react-router-dom";

import Home from "./pages/home";
import Projects from "./pages/projects";
import AboutMe from "./pages/About me";
import HexagonAnimation from "./component/landing/lander";
//import InProgress from "./component/inProgress/inProgress";

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
            element={<Home />}
          />
          <Route
            path="/portfolio-website/projects"
            element={<Projects />}
          />
          <Route
            path="/portfolio-website/about-me"
            element={<AboutMe />}
          />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}
export default App;

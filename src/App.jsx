import "./style/App.scss";
import CreateEmployee from "./pages/CreateEmployee/CreateEmployee";
import ListEmployees from "./pages/ListEmployees/ListEmployees";
import NotFound from "./pages/NotFound/NotFound";
import { Routes, Route } from "react-router-dom";

/**
 * A function that returns a JSX element.
 * Returns the routes of the pages.
 *
 * @component
 * @name App
 * @kind function
 * @returns { JSX.Element }
 */
function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/list-employees" element={<ListEmployees />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

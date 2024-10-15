import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routes/Routing";

const App = () => (
  <>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </>
);

export default App;

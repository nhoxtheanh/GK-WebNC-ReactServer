import { Switch, Route, BrowserRouter } from "react-router-dom";
import AppLayout from "./Containers/AppLayout";
// import Board from "./Pages/Dashboard"
import "antd/dist/antd.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        //TODO
        {/* <Route path="/notfound" component={NotFoundPage} /> */}
        <Route component={AppLayout} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

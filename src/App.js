import { Switch, Route, BrowserRouter } from "react-router-dom";
import AppLayout from "./Containers/AppLayout";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <ToastProvider>
          {/* <Route path="/notfound" component={NotFoundPage} /> */}
          <Route component={AppLayout} />
        </ToastProvider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

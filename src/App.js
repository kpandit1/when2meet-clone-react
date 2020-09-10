import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CreateEvent from "./CreateEvent";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Meeting from "./Meeting";

function App() {
  // TODO: get rid of div className="App", it really doesn't do much
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={CreateEvent}></Route>
          <Route path="/meeting/:id" component={Meeting}></Route>
          <Route path="*" component={CreateEvent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react"
import { Route, Switch } from "react-router-dom"
import HomePage from './home/HomePage';
// import Header from './common/Header';
import PageNotFound from "../PageNotFound";
// import AvailableApts from './courses/CoursesPage';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default App;
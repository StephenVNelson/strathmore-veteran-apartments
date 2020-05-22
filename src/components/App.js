import React from "react"
import { Route, Switch } from "react-router-dom"
import HomePage from './home/HomePage';
// import Header from './common/Header';
import PageNotFound from "../PageNotFound";
// import AvailableApts from './courses/CoursesPage';
import NewProspectForm from './prospects/NewProspectForm';

function App() {
  return (
    <div className="container-fluid">
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/apply/:slug'} component={NewProspectForm} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default App;
import React from "react"
import { Route, Switch } from "react-router-dom"
import HomePage from './home/HomePage';
import PageNotFound from "../PageNotFound";
import NewProspectForm from './prospects/newProspectForm/NewProspectForm';
import Header from './common/Header'

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/apply/:slug'} component={NewProspectForm} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

export default App;
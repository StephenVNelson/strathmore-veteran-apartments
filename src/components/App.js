import React, { useEffect } from "react"
import { connect } from "react-redux"
import { loadBuildings } from '../redux/actions/buildingActions';
import { loadApartments } from "../redux/actions/apartmentActions"
import { loadRoommateGroups } from "../redux/actions/roommateGroupActions"
import { loadProspects } from "../redux/actions/prospectActions"
import { Route, Switch } from "react-router-dom"
import HomePage from './home/HomePage';
import PageNotFound from "../PageNotFound";
import Header from './common/header/Header'
import { PropTypes } from 'prop-types';
import Alerts from "./common/alerts/Alerts";


function App({
  buildings,
  apartments,
  roommateGroups,
  prospects,
  loadBuildings,
  loadApartments,
  loadRoommateGroups,
  loadProspects
}) {
  useEffect(() => {
    // if (!companies.records) {
    //   loadCompanies().catch(error => {
    //     alert("Loading companies failed:" + error)
    //   });
    // }
    if (!buildings.records) {
      loadBuildings().catch(error => {
        alert("Loading buildings failed:" + error)
      });
    }
    if (!apartments.records) {
      loadApartments().catch(error => {
        alert("Loading apartments failed:" + error)
      });
    }
    if (!roommateGroups.records) {
      loadRoommateGroups().catch(error => {
        alert("Loading roommateGroups failed:" + error)
      });
    }
    if (!prospects.records) {
      loadProspects().catch(error => {
        alert("Loading prospects failed:" + error)
      });
    }
  }, []);


  return (
    <div className="container-fluid">
      <Header />
      <Alerts />
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        {/* <Route path={'/apply/:slug'} component={NewProspect} /> */}
        <Route component={PageNotFound} />
      </Switch>
    </div>
  )
}

App.propTypes = {
  loadBuildings: PropTypes.func.isRequired,
  loadApartments: PropTypes.func.isRequired,
  loadRoommateGroups: PropTypes.func.isRequired,
  loadProspects: PropTypes.func.isRequired,
  buildings: PropTypes.array.isRequired,
  apartments: PropTypes.array.isRequired,
  roommateGroups: PropTypes.array.isRequired,
  prospects: PropTypes.array.isRequired
}

const mapDispatchToProps = {
  loadBuildings,
  loadApartments,
  loadRoommateGroups,
  loadProspects
}

function mapStateToProps(state) {
  return {
    companies: state.companies.records || [],
    buildings: state.buildings.records || [],
    apartments: (
      state.buildings.records &&
      state.prospects.records &&
      state.roommateGroups.records &&
      state.apartments.records
    ) ? state.apartments.records : [],
    roommateGroups: state.roommateGroups.records || [],
    prospects: state.prospects.records || []
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
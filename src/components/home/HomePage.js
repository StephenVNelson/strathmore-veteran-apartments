import React from "react";
import Filters from "../Filters"
import { connect } from 'react-redux';
import * as companyActions from '../../redux/actions/companyActions'
import * as buildingActions from '../../redux/actions/buildingActions'
import * as apartmentActions from '../../redux/actions/apartmentActions'
import * as roommateGroupActions from '../../redux/actions/roommateGroupActions'
import * as prospectActions from '../../redux/actions/prospectActions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ApartmentList from '../apartments/ApartmentsList'



// import { Link } from "react-router-dom";

class HomePage extends React.Component {
  componentDidMount() {
    const { companies, buildings, apartments, roommateGroups, prospects, actions } = this.props;
    if (companies.length === 0) {
      actions.loadCompanies().catch(error => {
        alert("Loading companies failed:" + error)
      });
    }
    if (buildings.length === 0) {
      actions.loadBuildings().catch(error => {
        alert("Loading buildings failed:" + error)
      });
    }
    if (apartments.length === 0) {
      actions.loadApartments().catch(error => {
        alert("Loading apartments failed:" + error)
      });
    }
    if (roommateGroups.length === 0) {
      actions.loadRoommateGroups().catch(error => {
        alert("Loading roommateGroups failed:" + error)
      });
    }
    if (prospects.length === 0) {
      actions.loadProspects().catch(error => {
        alert("Loading prospects failed:" + error)
      });
    }
  }
  render() {
    return (<>
      <Filters />
      <ApartmentList apartments={this.props.apartments} />
    </>);
  }
}

HomePage.propTypes = {
  companies: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
  apartments: PropTypes.array.isRequired,
  roommateGroups: PropTypes.array.isRequired,
  prospects: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function apartmentMapping(state) {
  const { apartments, buildings, roommateGroups } = state
  if (buildings.length === 0 || roommateGroups.length === 0) {
    return []
  } else {
    return apartments.map(apartment => {
      let building = buildings.find(b => b.id == apartment.fields.building[0]) || {}
      let roommateGroup = roommateGroups.find(g => g.id == apartment?.fields?.roommateGroup?.[0]) || {}
      return { ...apartment, fields: { ...apartment.fields, building, roommateGroup } }
    })
  }
}

function mapStateToProps(state) {
  return {
    companies: state.companies,
    buildings: state.buildings,
    apartments: apartmentMapping(state),
    roommateGroups: state.roommateGroups,
    prospects: state.prospects
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadCompanies: bindActionCreators(companyActions.loadCompanies, dispatch),
      loadBuildings: bindActionCreators(buildingActions.loadBuildings, dispatch),
      loadApartments: bindActionCreators(apartmentActions.loadApartments, dispatch),
      loadRoommateGroups: bindActionCreators(roommateGroupActions.loadRoommateGroups, dispatch),
      loadProspects: bindActionCreators(prospectActions.loadProspects, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
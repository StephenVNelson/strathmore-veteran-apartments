import React from "react";
import Filters from "../Filters"
import { connect } from 'react-redux';
import * as apartmentActions from '../../redux/actions/apartmentActions'
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ApartmentList from '../apartments/ApartmentsList'



// import { Link } from "react-router-dom";

class HomePage extends React.Component {
  componentDidMount() {
    const { apartments, actions } = this.props;
    if (apartments.length === 0) {
      actions.loadApartments().catch(error => {
        alert("Loading courses failed:" + error)
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
  apartments: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    apartments: state.apartments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadApartments: bindActionCreators(apartmentActions.loadApartments, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
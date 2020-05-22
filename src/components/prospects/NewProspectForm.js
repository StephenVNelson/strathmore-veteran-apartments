import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { loadApartments } from '../../redux/actions/apartmentActions'
import { newApartment } from '../../../tools/mockData'
import { PropTypes } from 'prop-types';

const NewProspectForm = ({ apartment, loadApartments, apartments }) => {
  useEffect(() => {
    if (!apartments.records) {
      loadApartments().catch(error => {
        alert("Loading apartments failed:" + error)
      });
    }
  }, [])

  return (
    <div>
      <p>Hello</p>
      <div>{apartment.fields.unit}</div>
    </div>
  )
}

const mapDispatchToProps = {
  loadApartments
}

function mapStateToProps(state, ownProps) {
  return {
    apartments: state.apartments,
    apartment: state.apartments.records ?
      state.apartments.records.find(apartment => apartment.fields.unit === ownProps.match.params.slug) :
      newApartment
  }
}

NewProspectForm.propTypes = {
  apartment: PropTypes.object.isRequired,
  apartments: PropTypes.object.isRequired,
  loadApartments: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProspectForm)
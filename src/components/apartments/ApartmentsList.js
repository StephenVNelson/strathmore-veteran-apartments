import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Apartment from "./Apartment"
import { connect } from "react-redux"
import { loadCompanies } from '../../redux/actions/companyActions';
import { loadBuildings } from '../../redux/actions/buildingActions';
import { loadApartments } from "../../redux/actions/apartmentActions"
import { loadRoommateGroups } from "../../redux/actions/roommateGroupActions"
import { loadProspects } from '../../redux/actions/prospectActions';
import { newRoommateGroup } from '../../../tools/mockData'

const ApartmentsList = ({
  companies,
  buildings,
  apartments,
  roommateGroups,
  prospects,
  loadCompanies,
  loadBuildings,
  loadApartments,
  loadRoommateGroups,
  loadProspects,
  ...props
}) => {
  useEffect(() => {
    if (companies.length === 0) {
      loadCompanies().catch(error => {
        alert("Loading companies failed:" + error)
      });
    }
    if (buildings.length === 0) {
      loadBuildings().catch(error => {
        alert("Loading buildings failed:" + error)
      });
    }
    if (apartments.length === 0) {
      loadApartments().catch(error => {
        alert("Loading apartments failed:" + error)
      });
    }
    if (roommateGroups.length === 0) {
      loadRoommateGroups().catch(error => {
        alert("Loading roommateGroups failed:" + error)
      });
    }
    if (prospects.length === 0) {
      loadProspects().catch(error => {
        alert("Loading prospects failed:" + error)
      });
    }

  }, [props.apartments]);

  // gets rid of apartments with enough people who have applied.
  const apartmentsWithSlots = () => {
    return apartments.filter(apartment => {
      // keeps apartments where nobody has applied
      if (!apartment.fields?.roommateGroup?.[0]) return true

      // keeps apartments where there is still room for people to apply
      if (apartment.fields?.roommateGroup?.[0]) {
        const roommateGroup = lookupById(roommateGroups, apartment.fields.roommateGroup).fields
        return roommateGroup.prospects.length < roommateGroup.roommateTotal
      }
    })
  }

  return (<div className="apartment-list">
    {apartmentsWithSlots().map(apartment => {
      const building = lookupById(buildings, apartment.fields.building[0])
      const roommateGroup = lookupById(roommateGroups, apartment.fields?.roommateGroup?.[0]) || newRoommateGroup
      const groupProspects = roommateGroup.fields.prospects.map(prospect => lookupById(prospects, prospect))
      return <Apartment key={apartment.id} apartment={apartment} building={building} roommateGroup={roommateGroup} prospects={groupProspects} />
    })}
  </div>)
}

const lookupById = (resources, id) => resources.find(resource => resource.id == id)

ApartmentsList.propTypes = {
  companies: PropTypes.array.isRequired,
  buildings: PropTypes.array.isRequired,
  apartments: PropTypes.array.isRequired,
  roommateGroups: PropTypes.array.isRequired,
  prospects: PropTypes.array.isRequired,
  loadCompanies: PropTypes.func.isRequired,
  loadBuildings: PropTypes.func.isRequired,
  loadApartments: PropTypes.func.isRequired,
  loadRoommateGroups: PropTypes.func.isRequired,
  loadProspects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    companies: state.companies,
    buildings: state.buildings,
    apartments: (state.prospects.length > 0 && state.roommateGroups.length > 0) ? state.apartments : [],
    roommateGroups: state.roommateGroups,
    prospects: state.prospects
  }
}

const mapDispatchToProps = {
  loadCompanies,
  loadBuildings,
  loadApartments,
  loadRoommateGroups,
  loadProspects
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsList);

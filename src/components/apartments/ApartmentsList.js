import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Apartment from "./apartment/Apartment"
import { connect } from "react-redux"
import { newRoommateGroup } from '../../../tools/mockData'

const ApartmentsList = ({
  buildings,
  apartments,
  roommateGroups,
  prospects
}) => {
  useEffect(() => {
    if (jump) {
      setTimeout(() => {
        setJump(false)
      }, 400)
    }
    if (!jump && jumping) {
      setTimeout(() => {
        setJump(true)
      }, 1600)
    }

    // return () => clearTimeout(move)
  })
  const [jump, setJump] = useState(false)
  const [jumping, setJumping] = useState(true)


  // gets rid of apartments with enough people who have applied.
  const apartmentsWithSlots = () => {
    if (apartments) {
      return apartments.filter(apartment => {
        const { roommateGroup } = apartment.fields

        // keeps apartments where nobody has applied
        if (!roommateGroup) return true
        const [id] = roommateGroup
        // keeps apartments where there is still room for people to apply
        if (id) {
          const getRMGroup = lookupById(roommateGroups, id).fields
          return getRMGroup.prospects.length < getRMGroup.roommateTotal
        }
      })
    } else { return [] }
  }
  return (<div className="apartment-list">
    {apartmentsWithSlots().map(apartment => {

      const building = lookupById(buildings, apartment.fields.building[0])

      const roommateGroup = lookupById(
        roommateGroups,
        apartment.fields?.roommateGroup?.[0]
      ) ||
        newRoommateGroup

      const groupProspects = roommateGroup.fields.prospects.map(
        prospect => lookupById(prospects, prospect)
      )

      return <Apartment
        key={apartment.id}
        apartment={apartment}
        building={building}
        roommateGroup={roommateGroup}
        prospects={groupProspects}
        jump={jump}
        setJumping={setJumping}
      />

    })}
  </div>)
}

const lookupById = (resources, id) => resources.find(resource => resource.id === id)

ApartmentsList.propTypes = {
  buildings: PropTypes.array.isRequired,
  apartments: PropTypes.array.isRequired,
  roommateGroups: PropTypes.array.isRequired,
  prospects: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    companies: state.companies.records || [],
    buildings: state.buildings.records || [],
    apartments: (
      state.roommateGroups.records &&
      state.prospects.records &&
      state.buildings.records
    ) ? state.apartments.records : [],
    roommateGroups: state.roommateGroups.records || [],
    prospects: state.prospects.records || []
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ApartmentsList);

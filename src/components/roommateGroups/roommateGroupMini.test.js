import React from 'react'
import { shallow } from 'enzyme'
import { mockData } from '../../../tools/mockData'
import { recordify, replaceProperties, createFactory } from '../../../tools/testUtils';
import { addStateDataToApartments } from '../apartments/dataHelpers';
import RoommateGroupMini from './roommateGroupMini';

const setup = (dataReplacement) => {
  const prospects = createFactory(2, mockData.prospects[0])
  const roommateGroup = createFactory(1, mockData.roommateGroups[0], { prospects })
  const apartments = createFactory(1, mockData.apartments[0], { roommateGroup })
  const revisedApartment = replaceProperties(apartments[0], dataReplacement)
  console.log(revisedApartment.fields.roommateGroup[0]?.fields?.roommateTotal)
  return shallow(<RoommateGroupMini apartment={revisedApartment} />)
}

describe("<MiniMen/>", () => {

  describe("roommate groups", () => {
    test.skip("has no arrows if there are no roommate groups", () => {

    })
    test.skip("has no arrows if there is only one roommate groups", () => {

    })
    describe("three roommate groups", () => {
      test.skip("has a right arrow if there is more than one roommate group", () => {

      })
      test.skip("has a right and a left arrow if it's on the second roommate group of three", () => {

      })
      test.skip("has only left arrow if it's on the last roommate group of three", () => {

      })
    })
  })
})


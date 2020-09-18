import React from 'react'
import { shallow } from 'enzyme'
import { mockData } from '../../../tools/mockData'
import { recordify, replaceProperties, createFactory } from '../../../tools/testUtils';
import { addStateDataToApartments } from '../apartments/dataHelpers';
import RoommateGroupMini from './roommateGroupMini';
import MiniMen from './mini-men/MiniMen';

const setup = (dataReplacement) => {
  const prospects = createFactory(2, mockData.prospects[0])
  const roommateGroup = createFactory(1, mockData.roommateGroups[0], { prospects })
  const apartments = createFactory(1, mockData.apartments[0], { roommateGroup })
  const revisedApartment = replaceProperties(apartments[0], dataReplacement)
  return shallow(<RoommateGroupMini apartment={revisedApartment} />)
}
let dataReplacer;
describe("<RoommateGroupMini/>", () => {

  describe("roommate groups", () => {
    test("has no arrows if there are no roommate groups", () => {
      const wrapper = setup({ roommateGroup: [] })
      expect(wrapper.find(".arrow")).toHaveLength(0)
    })
    test("has no arrows if there is only one roommate groups", () => {
      const wrapper = setup()
      expect(wrapper.find(".arrow")).toHaveLength(0)
    })
    describe("three roommate groups", () => {
      let roommateGroup;
      beforeEach(() => { // attaches three roommateGroups to the apartment
        const prospects = createFactory(2, mockData.prospects[0])
        roommateGroup = createFactory(3, mockData.roommateGroups[0], { prospects })
      })

      test("Only displays one <MiniMen/> at a time", () => {
        const wrapper = setup({ roommateGroup })
        expect(wrapper.find(MiniMen)).toHaveLength(1)
      })
      test("has a right arrow if there is more than one roommate group", () => {
        const wrapper = setup({ roommateGroup })
        expect(wrapper.find('.arrow')).toHaveLength(1)
      })
      test("has a right and a left arrow if it's on the second roommate group of three", () => {
        const mockState = jest.fn()
        React.useState = jest.fn(() => [0, mockState])
        const wrapper = setup({ roommateGroup })
        console.log(wrapper.debug())
        wrapper.find('.arrow').simulate('click')
        expect(mockState).toHaveBeenCalled()
      })
      test.skip("has only left arrow if it's on the last roommate group of three", () => {

      })
    })
  })
})


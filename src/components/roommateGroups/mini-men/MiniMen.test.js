import React from 'react'
import { shallow } from 'enzyme'
import MiniMen from './MiniMen'
import { mockData } from '../../../../tools/mockData'
import { recordify, replaceProperties, createFactory } from '../../../../tools/testUtils';
import { addStateDataToApartments } from '../../apartments/dataHelpers';

const setup = (numberOfRoommateGroups, dataReplacement = {}, bedrooms = 1) => {
    const prospects = createFactory(2, mockData.prospects[0])
    const roommateGroup = createFactory(numberOfRoommateGroups, mockData.roommateGroups[0], { prospects, ...dataReplacement })
    return shallow(<MiniMen bedrooms={bedrooms} roommateGroups={roommateGroup} />)
}

describe("<MiniMen/>", () => {
    describe("prospects", () => {

        test("loads three men for a 1 bedroom when there is no roommate group", () => {
            const wrapper = setup(0)
            expect(wrapper.find('.miniMan')).toHaveLength(3)
        });

        test("changes the number of people to match the roommate max setting", () => {
            const wrapper = setup(1, { roommateTotal: 1 })
            expect(wrapper.find('.miniMan')).toHaveLength(1)
        })
        test.skip("adds the correct number of filled slots to unfilled slots", () => {

        })
        // test.skip("does something when roommateGroups is undefined", () => {
        //     const wrapper = setup({ roommateGroup: undefined })
        //     expect(wrapper.find('.miniMan')).toHaveLength(3)
        // })
    })
    describe("roommate groups", () => {

    })
})


import React from 'react'
import { shallow } from 'enzyme'
import Apartment from './Apartment'
import { recordify, storeFactory } from '../../../../tools/testUtils';
import { mockData } from '../../../../tools/mockData'
import MiniMen from '../../roommateGroups/mini-men/MiniMen';

const setup = (replacementData = {}) => {
  const newMockData = Object.assign({}, mockData, replacementData)
  const initialState = recordify(newMockData)

  const store = storeFactory(initialState)
  return shallow(<Apartment store={store} apartment={initialState.apartments.records[0]} />).dive().dive()
}

describe("<Apartment/>", () => {
  test("Contains MiniMen component", () => {
    const wrapper = setup();
    expect(wrapper.find(MiniMen)).toHaveLength(1)
  })
})
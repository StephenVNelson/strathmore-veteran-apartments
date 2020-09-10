import React from 'react'
import { shallow } from 'enzyme'
import MiniMen from './MiniMen'

// Enzyme Benefits
// 1. It can render out components 
// 2. We can grab elements of the components with CSS selectors
// 3. We can simulate interactions

const setup = () => {

    return shallow(<MiniMen />)
}

test.skip("component loads correctly", () => {
    const wrapper = setup()
    console.log(wrapper.debug())
    // expect(wrapper)
});


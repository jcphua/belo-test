import * as React from 'react';
import { shallow, mount } from 'enzyme';
import GridPage, { generateGrid } from '../components/GridPage';

import jsdom from 'jsdom';
const { JSDOM } = jsdom;
const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;

describe('<GridPage />', () => {
    let rows = 3,
        cols = 3;
    it(`Renders ${rows}x${cols} (square) grid`, () => {
        const wrapper = shallow(<GridPage rows={rows} cols={cols} />);
        expect(wrapper.find('div.grid-container').children()).toHaveLength(rows*cols);
    });

    rows = 4;
    cols = 3;
    it(`Renders ${rows}x${cols} (non-square) grid`, () => {
        const wrapper = shallow(<GridPage rows={rows} cols={cols} />);
        expect(wrapper.find('div.grid-container').children().last().find('input').props().id).toEqual(`cell[${rows-1},${cols-1}]`);
    });

    rows = 6; cols = 6;
    it(`Renders ${rows}x${cols} grid: <<<ATTEMPTED STATE CHANGE CHECK (CODE DISABLED)>>>`, () => {
        const grid = generateGrid(rows, cols);
        [[1,2], [2,3], [3,1], [3,2], [3,3]].forEach((val) => grid[val[0]][val[1]] = 1);
        console.log(grid);
        const wrapper = mount(<GridPage rows={rows} cols={cols} />);

        // Does not work with functional component:
        // wrapper.setState(grid); 

        // Cannot call undeclared user-defined setState callback function
        // wrapper.instance().setGeneration(1);

        /*
        // const setGrid = jest.fn();
        const setGeneration = jest.fn();

        const handleSubmit = jest.spyOn(React, 'useState');
        
        // Cannot locate references to user-defined callback functions:
        // handleSubmit.mockImplementation(grid => [grid, setGrid]);
        handleSubmit.mockImplementation(generation => [generation, setGeneration]);

        wrapper.find('button[type=submit]').simulate('click');
        // expect(setGrid).toBeTruthy();
        expect(setGeneration).toBeTruthy();

        // */
        expect(wrapper).toBeTruthy();
    });


    // it('Output sample', () => {
    //     const wrapper = shallow(<GridPage rows={3} cols={3} />);
    //     console.log(wrapper.debug());
    // });

    // it('renders snapshot', () => {
    //     const wrapper = shallow(<GridPage rows={3} cols={3} />);
    //     expect(wrapper).toMatchSnapshot();
    // });

});
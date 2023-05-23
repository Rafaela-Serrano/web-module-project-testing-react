import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import userEvent from '@testing-library/user-event'

const showData = {
    name:"test",
    summary:"test summary",
    seasons:[ 
    { id: 0, name:"season 1", episodes:[] } ,
    { id: 1, name: "season 2", episodes:[]}
]
}

test('renders without errors', () => {
    render(<Show show={showData} selectedSeason={"none"}/>)
 });

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)

    const loading = screen.queryByTestId("loading-container")

    expect(loading).toBeInTheDocument()
});

test('renders same number of options seasons are passed in', () => {
    render (<Show show={showData} selectedSeason={"none"}/>)

    const seasonOptions = screen.queryAllByTestId("season-option")
    expect(seasonOptions).toHaveLength(2)

 });

test('handleSelect is called when an season is selected', () => { 

    const handleSelect = jest.fn(); 

    render (<Show show={showData} selectedSeason={"none"} handleSelect={handleSelect()}/>)

    const select = screen.getByLabelText(/Select A Season/i)
    userEvent.selectOptions(select, ['1']);

    expect(handleSelect).toBeCalled();

    //this is a good oportunity to do a mock 

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {

   render(< Show show={showData} selectedSeason={"none"}/>);

   let episodesSelect = screen.queryByTestId("episodes-container");

   expect(episodesSelect).not.toBeInTheDocument();

    
});

test ('container exist', () => {
    render(<Show show={showData} selectedSeason={"1"} />)
    
    let episodesSelect = screen.queryByTestId("episodes-container");

    console.log(episodesSelect)

    expect(episodesSelect).toBeInTheDocument();
})

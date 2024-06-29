import React, { useState } from "react";
import axios from "axios";
import * as Styled from './styledcomponents';
import { Link } from "react-router-dom"; 

function BrewerySearch() {
    const [searchType, setSearchType] = useState("by_city");
    const [searchQuery, setSearchQuery] = useState("");
    const [breweries, setBreweries] = useState([]);

    const handleSearchTypeChange = (e) => {
        setSearchType(e.target.value);
    };

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        axios.get(`https://api.openbrewerydb.org/v1/breweries?${searchType}=${searchQuery}`)
            .then(res => {
                setBreweries(res.data);
            })
            .catch(err => {
                console.error(err);
            });
    };

    return (
        <Styled.Container>
            <Styled.Title>Search Breweries</Styled.Title>
            <Styled.Form onSubmit={handleSearch}>
                <Styled.Select value={searchType} onChange={handleSearchTypeChange}>
                    <option value="by_city">By City</option>
                    <option value="by_name">By Name</option>
                    <option value="by_type">By Type</option>
                </Styled.Select>
                <Styled.Input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    placeholder="Enter your search query"
                />
                <Styled.Button type="submit">Search</Styled.Button>
            </Styled.Form>
            <Styled.BreweryList>
    {breweries.length > 0 ? (
        breweries.map(brewery => {
            const firstSpaceIndex = brewery.name.indexOf(' ');
            const breweryName = firstSpaceIndex !== -1 ? brewery.name.slice(firstSpaceIndex + 1) : brewery.name;

            return (
                <Styled.BreweryCard key={brewery.id}>
                   <Link to={`/brewery/${brewery.id}`}>
                      <Styled.BreweryName>{breweryName}</Styled.BreweryName>
                      <Styled.BreweryInfo>Address: {brewery.street}, {brewery.city}, {brewery.state}</Styled.BreweryInfo>
                      <Styled.BreweryInfo>Phone: {brewery.phone}</Styled.BreweryInfo>
                      <Styled.BreweryInfo>Website: <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a></Styled.BreweryInfo>
                      <Styled.BreweryInfo>State: {brewery.state}, City: {brewery.city}</Styled.BreweryInfo>
                      <Styled.BreweryInfo>Current Rating: N/A</Styled.BreweryInfo>
                    </Link>
                </Styled.BreweryCard>
            );
        })
    ) : (
        <p>No results found</p>
    )}
</Styled.BreweryList>

        </Styled.Container>
    );
}

export default BrewerySearch;

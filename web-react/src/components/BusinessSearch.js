import React, { useState } from 'react';
import BusinessResults from './BusinessResults';
//Apollo client import statement
import{ gql, useQuery } from '@apollo/client';

//Construct GQL query
const GET_BUSINESS_QUERY = gql`
    query BusinessesByCategory($selectedCategory: String!) {
        Business(
            filter: { categories_some: { name_contains: $selectedCategory } }
        ) {
            businessId
            name
            address
            categories {
                name
            }
        }
    }
`;


function BusinessSearch() {

//using react hooks here
const [selectedCategory, setSelectedCategory] = useState("");

//using apollo client hook to run query with a variable
const { loading, error, data} = useQuery(GET_BUSINESS_QUERY, { variables: { selectedCategory } });

if (error) return <p>Error encountered runnng gql query</p>;
if (loading) return <p>Loading...</p>;

    return(
        <div>
            <h1>Business Search</h1>
            <form>
                <label>
                    Select Business Category:
                    <select value={selectedCategory}
                    onChange ={ (event) => setSelectedCategory(event.target.value) }
                    >
                        <option value="">All</option>
                        <option value="Library">Library</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Car Wash">Car Wash</option>
                        <option value="Beer">Beer</option>
                    </select>
                </label>
                <input type="submit" value="Submit"/>
            </form>
            <hr/>
            <BusinessResults businesses={ data.Business } />
        </div>
        

    );
};

export default BusinessSearch;
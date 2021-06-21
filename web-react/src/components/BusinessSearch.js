import React, { useState } from 'react';
import BusinessResults from './BusinessResults';
//Apollo client import statement
import{ gql, useQuery } from '@apollo/client';
//Auth0
import { useAuth0 } from '@auth0/auth0-react';
//import Profile Avitar
import Profile from './Profile';



function BusinessSearch() {

//using react hooks here for dropdown search box
const [selectedCategory, setSelectedCategory] = useState("");
//auth0 called to access destructured functions
const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

//create fragment (for reuse) and inject into template literal below
const BUSINESS_DETAILS_FRAGMENT = gql`
    fragment BusinessDetails on Business {
        businessId 
        name
        address
        categories {
            name
        }
    }
`;

//Construct GQL query
const GET_BUSINESS_QUERY = gql`
    ${BUSINESS_DETAILS_FRAGMENT}

    query BusinessesByCategory($selectedCategory: String!) {
        Business(
            filter: { categories_some: { name_contains: $selectedCategory } }
        ) {
        ...BusinessDetails
        ${isAuthenticated ? "avgStars" : ""}
        }
    }
`;

//using apollo client hook to run query with a variable
const { loading, error, data, refetch} = useQuery(GET_BUSINESS_QUERY, { 
    variables: { selectedCategory },
    pollInterval: 0
    });

if (error) return <p>Error encountered accessing database.</p>;
if (loading) return <p>Loading application...</p>;

    return(
        <div>
            {/* Login/Logout buttons */}
            {!isAuthenticated && <button onClick={() => loginWithRedirect()}>Log In</button>}
            {isAuthenticated && <button onClick={() => logout()}>Log Out</button>}
            {/* Login/Logout buttons */}
            <Profile/>
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
                <input type="submit" value="Refetch" onClick={() => refetch()}/> {/* GPL cache refetch used (versus polling) here*/}
            </form>
            <hr/>
            <BusinessResults businesses={ data.Business } />
        </div>
        

    );
};

export default BusinessSearch;
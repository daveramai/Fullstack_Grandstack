import React, { useCallback, useEffect, useState } from 'react';
import App from '../App';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from "@auth0/auth0-react";

const AppWithApollo = () => {
const [accessToken, setAccessToken] = useState();
const { getAccessTokenSilently } = useAuth0();

const getAccessToken = useCallback(async () => {
    try {
        const token = await getAccessTokenSilently();
        setAccessToken(token);
    } catch (err) {
    // If we want to require authentication we could call loginWithRedirect() here
    }
}, [getAccessTokenSilently]);

useEffect(() => {
    getAccessToken();
}, [getAccessToken]);

const httpLink = createHttpLink({
    uri: "http://localhost:4000",
});

const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
    };
});

//Connect an instance of Apollo client to Neo4j DB
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});


    return (
        <ApolloProvider client={ client }>
          <App />
        </ApolloProvider>
    )   
}; //end

export default AppWithApollo;

import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

function BusinessResults({businesses}) {
    const { isAuthenticated } = useAuth0();

    return(
        <div>
            <h2>Results</h2>
            <table style={{marginLeft: "auto", marginRight: "auto"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Category</th>
                        { isAuthenticated ? <th>Average Stars*</th> : null }
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((b, i) => (
                    <tr key={i}>
                        <td>{b.name}</td>
                        <td>{b.address}</td>
                        <td>{b.categories.reduce(
                            (acc, c, i) => acc + (i === 0 ? " ": ", ") + c.name,
                            ""
                        )}</td>
                        { isAuthenticated ? <td>{b.avgStars}</td> : null }
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default BusinessResults;
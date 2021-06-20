import React from 'react';

function BusinessResults({businesses}) {
    return(
        <div>
            <h2>Results</h2>
            <table style={{marginLeft: "auto", marginRight: "auto"}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {businesses.map((b, i) => (
                    <tr key={i}>
                        <td>{b.name}</td>
                        <td>{b.address}</td>
                        <td>{b.category}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>

    );
};

export default BusinessResults;
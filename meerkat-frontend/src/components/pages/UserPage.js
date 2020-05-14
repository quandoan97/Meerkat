import React, { useEffect, useState } from 'react';

export default function UserPage() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <div>
            <h1 style={{textDecoration: 'underline'}}>User Page</h1>
            <h2>{`${userData.firstName} ${userData.lastName} (${userData.username})`}</h2>
            <h3 style={{color:'white'}}>Favorite Genres:</h3>
            <div align='center'>
                <ul>
                {
                    userData.favoriteGenres.map( (genre) => {
                        return(<li style={{width: '11%', color:'white'}}><h3 style={{color:'white'}}>{ genre.genreName }</h3></li>)
                    })
                }
                </ul>
            </div>

        </div>
    );
}


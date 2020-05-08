import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function View() {
    const [allRooms, setAllRooms] = useState([]);

    const data = ['Teresas Room', 'Two', 'Three', 'One', 'Two', 'Three']
    useEffect( async () => {
        await fetch('https://warm-meadow-92561.herokuapp.com/api/room/getAll')
        .then( res => res.json() )
        .then( (data) => {
            console.log(data);
            setAllRooms(data.rooms);
        })
        .catch(err => console.log(err));
    }, [])

        return (
            <Grid container md={12} direction='row' justify='center' alignItems='center'>
                <h1> Join A Room! </h1>
                { allRooms.length > 0 ?
                    <Grid container direction='row' justify='left' alignItems='left'>
                    {
                        allRooms.map( (room) => {
                            return (
                            <Link to={`/room?id=${room.id}`}>
                                    <Card>
                                        <CardContent>
                                            <h3>{room.roomName}</h3>
                                            <p>{room.roomGenre.genreName}</p>
                                        </CardContent>
                                    </Card>
                            </Link>)
                        })
                    }
                    </Grid>
                    :
                    <Grid container direction='row' justify='center' alignItems='center'>
                        <h2>Uh oh, no rooms have been created yet :( </h2>
                    </Grid>
                }
            </Grid>
        )
}

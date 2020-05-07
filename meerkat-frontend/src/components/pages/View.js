import React, { useState, useEffect } from 'react';
import { Card, CardContent, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function View() {
    const [allRooms, setAllRooms] = useState([]);

    const names = ['Name1', 'Name2', 'Name3']
    useEffect( () => {
        fetch('https://warm-meadow-92561.herokuapp.com/api/room/getAll')
        .then( res => res.json() )
        .then( (data) => {
            console.log(data);
            setAllRooms(data.rooms);
        })
        .catch(err => console.log(err));
    }, [])

        return (
            <Grid container direction='row' justify='center' alignItems='center'>
                <h1> Join A Room! </h1>
                <Grid container direction='row' spacing={3} justify='left' alignItems='left'>
                {
                    allRooms.map( (room) => {
                        return (
                        <Link to={`/room/id?=${room.id}`}>
                            <Grid item>
                                <Card>
                                    <CardContent>
                                        <h3>{room.roomName}</h3>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Link>)
                    })
                }
                </Grid>
            </Grid>
        )
}

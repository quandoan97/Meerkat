import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Input, Chip, Select, MenuItem, InputLabel } from '@material-ui/core/';
import ChipInput from 'material-ui-chip-input';


export default function Create() {

    const history = useHistory();

    const [allGenres, setAllGenres] = useState({});
    const [selectedGenre, setSelectedGenre] = useState(undefined);

    const {register, handleSubmit, errors, control} = useForm({
        defaultValues:{
            chips: []
        }
    })

    useEffect(() => {
        fetch('https://warm-meadow-92561.herokuapp.com/api/genre/getAll')
            .then( (res) => res.json() )
            .then( (genres) => {
                let genreInfo = { }
                genres.map( (genre) => {
                    genreInfo[genre.genreName] = genre.genreId;
                });
                setAllGenres(genreInfo);
            })
            .catch( (err) => { 
                console.log(err)
                //show error page
            });
    }, []);
    

    const onSubmit = (data, error, props) => {
        const hostId = JSON.parse(localStorage.getItem('userData')).id;
        data.hostId = hostId;
        data.roomGenre = JSON.parse(data.roomGenre);

        const jwt = localStorage.getItem('jwt');
        fetch('/api/room/create', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${jwt}`
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.ok){
                return response.json();
            }
        })
        .then( data => {
            console.log(data);
            let userData = JSON.parse(localStorage.getItem('userData'));
            userData.roomIds = [...userData.roomIds, data.roomId];
            localStorage.setItem('userData', JSON.stringify(userData));
        })
        .catch((error) => {
            console.error('Error', error);
        })
        
    };
    const handleSelect = (event) => {
        const genreName = event.target.value;
        const genreId = allGenres[genreName];
        setSelectedGenre({ genreId, genreName });
    }


    return (
        <div>
            <h1> Room Creation </h1>

            <form onSubmit={ handleSubmit(handleSubmit(data => console.log(data))) }>
                <div className="container">
                    <div className="row">
                        
                        <div className="col">
                            <Input
                                type="text"
                                name="roomName"
                                placeholder="My Room Name"
                                inputRef={
                                    register({
                                        required: "Please enter your room name",
                                        minLength: {value: 1, message: "Room name must be at least 1 character long"}
                                    })
                                }
                            />
                            { errors.roomName && <p className="p-error"> { errors.roomName.message } </p>}
                        </div>

                        <div className="col">
                            <InputLabel id="genreLabel">Genre</InputLabel>
                            <Select
                                labelId="genreLabel" 
                                id="genreSelect"
                                value={ selectedGenre ? selectedGenre.genreName : "" }
                                onChange={ handleSelect }
                            >
                                {
                                    Object.keys(allGenres).map( (genreName) => <MenuItem key={genreName} value={genreName}> {genreName} </MenuItem>)
                                }
                            </Select>
                            <Input 
                                type="hidden" 
                                name="roomGenre"
                                value={ JSON.stringify(selectedGenre) }
                                inputRef = { register( { required: "Please enter the room genre." }) }

                            />
                            { errors.roomGenre && <p className="p-error"> { errors.roomGenre.message }</p>}
                        </div>
                            
                    </div>
                    <div className="div-button">
                        <Button variant="outlined" color="primary" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                    </div>                
                </div>
            </form>
        </div>
    )
}

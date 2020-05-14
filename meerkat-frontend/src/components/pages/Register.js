import React, { useState, useEffect } from 'react';
import { TextField, Button, Input, Chip, InputLabel } from '@material-ui/core/';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


export default function Register(){
    //variable used to redirect users after registration 
    const history = useHistory();

    const [allGenres, setAllGenres] = useState({});
    const [selectedGenres, setSelectedGenres] = useState(new Set());

    const {register, handleSubmit, errors, control} = useForm({
        defaultValues: {

        }
    });

    //retrives all genres from server to render as chips
    useEffect(() => {
        fetch('https://warm-meadow-92561.herokuapp.com/api/genre/getAll')
            .then( (res) => res.json() )
            .then( (genres) => {
                let genreChipProps = { }
                genres.map( (genre) => {
                    genreChipProps[genre.genreId] = {...genre, isSelected: false}
                });
                setAllGenres(genreChipProps);
            })
            .catch( (err) => { 
                console.log(err)
                //show error page
            });
    }, []);
    
    const onSubmit = (data) => {
        data.favoriteGenres = JSON.parse(`[${data.favoriteGenres}]`);
        fetch('https://warm-meadow-92561.herokuapp.com/auth/register', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if(response.ok){
                return response.json();
            }
        })
        .then( data => {
            localStorage.setItem('jwt', data.jwt);
            localStorage.setItem('userData', JSON.stringify(data.userData));
            history.push('/');
        })
        .catch((error) => {
            alert('There was an error trying to register you.');
            console.error('Error', error);
        })
    };
    
    const handleChipClick = (event) => {
        //redirects context to the correct node (button) when clicking on the label
        while(event.target.getAttribute('genreid') == undefined)
            event.target = event.target.parentNode;

        //genre of the corresponding chip will be saved in state when clicked
        const genreId = event.target.getAttribute('genreid');
        const genreName = event.target.getAttribute('genreName');
        const genre = JSON.stringify({ genreId, genreName });
        setSelectedGenres(new Set([...selectedGenres, genre]));

        //the chip will be rendered unclickable unless deleted
        let newGenreProps = JSON.parse(JSON.stringify(allGenres));
        newGenreProps[genreId].isSelected = true;
        setAllGenres(newGenreProps);
    }

    const handleChipDelete = (event) => {
        while(event.target.getAttribute('genreid') == undefined)
            event.target = event.target.parentNode;

        //remove the genre from the selected set in state
        const genreIdToDelete = event.target.getAttribute('genreid');
        const genreNameToDelete = event.target.getAttribute('genrename');

        const genreToDelete = JSON.stringify({ genreId: genreIdToDelete, genreName: genreNameToDelete });

        let newSelectedGenres = new Set(selectedGenres);
        newSelectedGenres.delete(genreToDelete);
        setSelectedGenres(newSelectedGenres);

        //render the chip to be clickable again
        let newGenreProps = JSON.parse(JSON.stringify(allGenres));
        newGenreProps[genreIdToDelete].isSelected = false;
        setAllGenres(newGenreProps);

    }
    
        return (
            <div>
                <h1> Register Page </h1>

                <form onSubmit={ handleSubmit(handleSubmit(data => console.log(data))) }>
                    <div className="container">
                        <div className="row"> 

                            <div className="col"> 
                                <TextField 
                                    type="text" 
                                    name="firstName" 
                                    placeholder="First Name" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter first name", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} 
                                            }) 
                                        }
                                /> 
                                {errors.firstName && <p className="p-error"> { errors.firstName.message } </p>}
                            </div>

                            <div className="col">  
                                <Input 
                                    type="text" 
                                    name="lastName" 
                                    placeholder="Last Name" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter last name", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} }) 
                                        }
                                    /> 
                                {errors.lastName && <p className="p-error"> { errors.lastName.message } </p> }
                            </div>

                            <div className="col">  
                                <Input 
                                    type="text" 
                                    name="username" 
                                    placeholder="Username" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter Username", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} }) 
                                    }
                                /> 
                                {errors.username && <p className="p-error"> { errors.username.message } </p>}
                            </div>

                            <div className="col">  
                                <Input 
                                    type="password" 
                                    name="password" 
                                    placeholder="Password" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please Enter password", 
                                            minLength: {value: 8, message:"Password too short" }}) 
                                    }
                                /> 
                                {errors.password && <p className="p-error"> { errors.password.message } </p>}
                            </div>

                            <div className="col">
                                <Input 
                                    type="email" 
                                    name="email" 
                                    placeholder="Email Address" 
                                    inputRef={ 
                                        register({
                                            required: 'Required',
                                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                                            message: "invalid email address"}}) 
                                    }
                                />
                                {errors.email && <p className="p-error"> { errors.email.message } </p>}
                            </div>

                            <div className="col">
                            <InputLabel color='white' id="genreLabel">Favorite Genres</InputLabel>
                            {
                                Object.values(allGenres).map( (genre) => <Chip 
                                                            clickable = { !genre.isSelected }
                                                            color='secondary'
                                                            label={ genre.genreName }
                                                            genreName={ genre.genreName }
                                                            genreId={ genre.genreId } 
                                                            onClick={ genre.isSelected ? null : handleChipClick}
                                                            onDelete={ genre.isSelected ? handleChipDelete : null } 
                                                        /> )
                            }
                        </div>
                        <div className='col'>
                            <Input
                                name="favoriteGenres"
                                type="hidden"
                                value={[...selectedGenres]}
                                inputRef={register}
                            />
                        </div>
                        </div>
                    </div>
                    <div className="div-button">
                        <Button variant="contained" color="default" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                    </div>
                </form>

            </div>
        );
}
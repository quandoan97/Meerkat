import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { TextField, Button, Input, Chip } from '@material-ui/core/';
import ChipInput from 'material-ui-chip-input';


export default function Create() {

    const history = useHistory();

    const {register, handleSubmit, errors, control} = useForm({
        defaultValues:{
            chips: []
        }
    })

    const onSubmit = (data, error, props) => {
        //The first url is used to bypass CORS error
        fetch('https://cors-anywhere.herokuapp.com/'+'https://webhook.site/0fa7de81-e70b-4085-9716-b3e11c982f5f', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.ok){
                // alert("Thank you for registering")
                // history.push('/');
            }
        })
        .catch((error) => {
            console.error('Error', error);
        })
    };


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
                            <Controller 
                                as={
                                    <ChipInput
                                        fullWidthInput
                                        allowDuplicates="false"
                                        alwaysShowPlaceholder
                                        placeholder="Enter in genres"
                                        inputRef={register({
                                            required: "Please enter in the genre of your room"
                                        })}
                                        color="blue"
                                    />
                                } 
                                name="genres" 
                                control={control}
                            />
                            { errors.genres && <p className="p-error"> { errors.genres.message }</p>}
                        </div>
                            
                    </div>
                    <div className="div-button">
                        <Button variant="outlined" color="blue" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                    </div>                
                </div>
            </form>
        </div>
    )
}

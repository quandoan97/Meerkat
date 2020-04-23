import React from 'react';
import { TextField, Button, Input } from '@material-ui/core/';
import { useForm, Controller } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';


export default function Register(){
    //variable used to redirect users after registration 
    const history = useHistory();

    const {register, handleSubmit, errors, control} = useForm({
        defaultValues: {

        }
    });
    
    const onSubmit = (data) => {
        //The first url is used to bypass CORS error
        fetch('https://warm-meadow-92561.herokuapp.com/', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.ok){
                history.push('/');
            }
        })
        .catch((error) => {
            console.error('Error', error);
        })
    };
    
        return (
            <div>
                <h1> Register Page </h1>

                <form onSubmit={ handleSubmit(handleSubmit(data => console.log(data))) }>
                    <div className="container">
                        <div className="row"> 

                            <div className="col"> 
                                <TextField 
                                    type="text" 
                                    name="fName" 
                                    placeholder="First Name" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter first name", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} 
                                            }) 
                                        }
                                /> 
                                {errors.fName && <p className="p-error"> { errors.fName.message } </p>}
                            </div>

                            <div className="col">  
                                <Input 
                                    type="text" 
                                    name="lName" 
                                    placeholder="Last Name" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter last name", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} }) 
                                        }
                                    /> 
                                {errors.lName && <p className="p-error"> { errors.lName.message } </p> }
                            </div>

                            <div className="col">  
                                <Input 
                                    type="text" 
                                    name="uName" 
                                    placeholder="Username" 
                                    inputRef={ 
                                        register({ 
                                            required: "Please enter Username", 
                                            minLength: {value: 2, message: "Name must be at least 2 characters"} }) 
                                    }
                                /> 
                                {errors.lName && <p className="p-error"> { errors.lName.message } </p>}
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
                                    name="emailAddress" 
                                    placeholder="Email Address" 
                                    inputRef={ 
                                        register({
                                            required: 'Required',
                                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 
                                            message: "invalid email address"}}) 
                                    }
                                />
                                {errors.emailAddress && <p className="p-error"> { errors.emailAddress.message } </p>}
                            </div>

                            <div className="col">
                            <Controller 
                                as={
                                    <ChipInput
                                        fullWidthInput
                                        allowDuplicates="false"
                                        alwaysShowPlaceholder
                                        placeholder="Your favorite genres"
                                        inputRef={register}
                                        color="blue"
                                    />
                                } 
                                name="genres" 
                                control={control}
                            />
                            { errors.genres && <p className="p-error"> { errors.genres.message }</p>}
                        </div>
                            
                        </div>
                    </div>
                    <div className="div-button">
                        <Button variant="outlined" color="blue" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                    </div>
                </form>

            </div>
        );
}
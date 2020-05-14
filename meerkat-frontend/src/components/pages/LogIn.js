import React, { useState } from 'react';
import { TextField, Button, Input } from '@material-ui/core/'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router';


export default function LogIn(){
    const {register, handleSubmit, errors} = useForm();
        
    const history = useHistory();

    const onSubmit = (data) => {
        fetch('https://warm-meadow-92561.herokuapp.com/auth/login', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(function(response) {
            if(response.ok){
                return response.json()
            }
        })
        .then( data => {
             localStorage.setItem('jwt', data.jwt);
             localStorage.setItem('userData', JSON.stringify(data.userData));
             window.location.reload();
        })
        .catch((error) => {
            console.error('Error', error);
            alert('There was an error trying to log you in.');
        })
    };

        return (
            <React.Fragment>
            {
                localStorage.getItem('jwt') ?
                <Redirect to='/'/>
                :
                <div>
                    <h1> LogIn Page </h1>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <div className="container">
                            <div className="row"> 
                                <div className="col">  
                                    <input type="text" name="username" placeholder="Username" ref={ register }/> 
                                </div>
                                <div className="col">  
                                    <input type="password" name="password" placeholder="Password" ref={ register({required: "Please Enter password", minLength: {value: 8, message:"Password too short" }}) }/> 
                                    {errors.password && <p> {errors.password.message} </p>}
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button variant="contained" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                        </div>
                    </form>
                </div>
            }
        </React.Fragment>

        );
}
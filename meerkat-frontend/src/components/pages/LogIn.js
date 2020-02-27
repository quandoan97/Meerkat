import React from 'react';
import { TextField, Button,Input } from '@material-ui/core/'
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';


export default function LogIn(){
    const {register, handleSubmit, errors} = useForm();
        
    const history = useHistory();

    const onSubmit = (data) => {
        fetch('https://cors-anywhere.herokuapp.com/'+'https://webhook.site/42fb35aa-a83e-4ee2-be2a-6a20ba2dfc7a', {
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response) {
            if(response.ok){
                alert("Thank you for registering")
                history.push('/');
            }
        })
        .catch((error) => {
            console.error('Error', error);
        })
    };

        return (
            <div>
                <h1> LogIn Page </h1>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className="container">
                        <div className="row"> 
                            <div className="col">  
                                <input type="text" name="uName" placeholder="Username" ref={ register }/> 
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
        );
}
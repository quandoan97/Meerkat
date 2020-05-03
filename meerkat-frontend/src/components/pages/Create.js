import React from 'react';
import { TextField, Button,Input } from '@material-ui/core/'
import { useForm } from 'react-hook-form';


export default function Create() {
      const {register, handleSubmit, errors} = useForm();

      const onSubmit = (data) => {
          console.log(data);
      };

        return (
            <div>
                <h1> Room Creation </h1>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <input type="text" name="roomName" placeholder="Name Your Room" ref={ register({ required: "Please enter room name", minLength: {value: 2, message: "must be at least 2 characters"} }) }/>
                                {errors.roomName && <p> { errors.roomName.message } </p>}
                            </div>
                            <div className="col">
                                <input type="text" name="uniquePin" placeholder="Room Pin Number" ref={ register({ required: true, minLength: {value: 2, message: "Must be at least 2 characters"} }) }/>
                                {errors.uniquePin && <p> { errors.uniquePin.message } </p>}
                            </div>
                            <div className="col">
                                <input type="text" name="genre" placeholder="Genre" ref={ register }/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button variant="contained" onClick={ handleSubmit(onSubmit) }> Submit </Button>
                    </div>
                </form>
            </div>
        )
}

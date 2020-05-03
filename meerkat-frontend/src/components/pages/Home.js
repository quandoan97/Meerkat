import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css';
export default class Home extends Component {
    clicked(){
        console.log("I have been clicked");
    }
    render() {
        return (
            <div>
                  <div id="myhomecenter">
                  <h1> Meerkat <Link to="/"><img src="https://images.squarespace-cdn.com/content/v1/5344b511e4b0f9ffdd2f4841/1521017739604-ZLMWFJK956X1HJF6OPOL/ke17ZwdGBToddI8pDm48kFgn1pslFD_UBE0eFFMtvglZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHxphHZ44Pm_4vAF5TeJm73sFgJc9vxs1qDpNyVTVrPpTqWIIaSPh2v08GbKqpiV54/The+GreatZoo+Escape+2%3A+Meerkat+-+Run+Animation"
                  height = "50" alt="meerkatgif"></img></Link></h1>
                  <h2> A new way to enjoy videos together and communicate with your friends and family</h2>
                  </div>

                <footer class="container-fluid text-center">
                    <p>All rights reserved || Meerkat</p>
                </footer>
                </div>
        )
    }
}

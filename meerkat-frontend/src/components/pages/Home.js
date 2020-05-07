import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.css';
export default class Home extends Component {
    clicked(){
        console.log("I have been clicked");
    }
    render() {
        window.setTimeout("document.getElementById('meerkatgif2').style.display='none';", 15000);
        return (
            <div>
                  <div id="myhomecenter" class="container-fluid text-center">
                  <h1>
                   Meerkat
                  <Link to="/"><img src="https://images.squarespace-cdn.com/content/v1/5344b511e4b0f9ffdd2f4841/1521017739604-ZLMWFJK956X1HJF6OPOL/ke17ZwdGBToddI8pDm48kFgn1pslFD_UBE0eFFMtvglZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHxphHZ44Pm_4vAF5TeJm73sFgJc9vxs1qDpNyVTVrPpTqWIIaSPh2v08GbKqpiV54/The+GreatZoo+Escape+2%3A+Meerkat+-+Run+Animation"
                  height = "50" id="meerkatgif1" alt="meerkatgif1"></img></Link></h1>
                  <h2> A new way to enjoy videos together and communicate with your friends and family</h2>
                  </div>

                  <div id="aboutMeerkat" class="container-fluid text-left">
                    <div class="row">
                      <div class="col-sm-5">
                      <Link to="/"><img src="https://images.squarespace-cdn.com/content/v1/5344b511e4b0f9ffdd2f4841/1521017739604-ZLMWFJK956X1HJF6OPOL/ke17ZwdGBToddI8pDm48kFgn1pslFD_UBE0eFFMtvglZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVHxphHZ44Pm_4vAF5TeJm73sFgJc9vxs1qDpNyVTVrPpTqWIIaSPh2v08GbKqpiV54/The+GreatZoo+Escape+2%3A+Meerkat+-+Run+Animation"
                       id="meerkatgif2" alt="meerkatgif2"></img></Link>
                      </div>
                      <div class="col-sm-7">
                      <h3>
                      <ul>
                      <li>Join a public stream party OR</li>
                      <li>Invite Friends to a private stream party</li>
                      <li>while chatting with them about how this Meerkat disappears here :)</li></ul></h3>
                      </div>
                    </div>
                  </div>

                  <div id="mycontainerLogin" class="container-fluid text-center">
                    <div class="row">
                      <div class="col-sm-6">
                        <h3>Already have an account ?</h3>
                        <a href="/Login"><button class="button" id="btnLogin">Login</button></a>
                      </div>
                      <div class="col-sm-6">
                      <h3>Need a new account ?</h3>
                      <a href="/Register"><button class="button" id="btnLogin">Register</button></a>
                      </div>
                    </div>
                  </div>

                  <footer class="container-fluid text-center">
                      <h4>All rights reserved || Meerkat</h4>
                      <h4>Follow us on</h4>
                      <a href="#" class="fa fa-facebook"></a>
                      <a href="#" class="fa fa-google"></a>
                      <a href="#" class="fa fa-linkedin"></a>
                      <a href="#" class="fa fa-instagram"></a>
                  </footer>
                </div>

        )

    }
}

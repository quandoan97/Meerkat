import React, {Component} from 'react';
import { VideoPlayer } from '../';
import { Grid, TextField, Input } from '@material-ui/core';
import { Stomp } from '@stomp/stompjs';
import queryString from 'query-string';

export default class Room extends Component {
    constructor(props){
        super();

        this.state = {
            publishAdaptor: null,
            videoJsOptions: {
                autoplay: true,
                controls: true,
                sources: [{
                    src: '',
                    type: 'application/x-mpegURL'
                }],
                poster: "//vjs.zencdn.net/v/oceans.png"
            },
            stompClient: null,
            roomData: null,
            isHost: false,
            chatMessages: [],
            chatMesageContent: ''
        }
        this.onStreamClick = this.onStreamClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
        this.setClientVidSrc = this.setClientVidSrc.bind(this);
        this.handleSocketMessages = this.handleSocketMessages.bind(this);
        this.handleAdaptorInfo = this.handleAdaptorInfo.bind(this);
        this.handleSocketConnect = this.handleSocketConnect.bind(this);
        this.handleMessageSubmit = this.handleMessageSubmit.bind(this);
        this.addChatMessage = this.addChatMessage.bind(this);
    }

    handleSocketConnect(frame) {
        console.log('Connected: ', frame);
        this.state.stompClient.subscribe(`/topic/rooms/${this.state.roomData.id}`, this.handleSocketMessages);

        const { username } = JSON.parse(localStorage.getItem('userData'));
        this.state.stompClient.send(`/streams/join/${this.state.roomData.id}`, {}, 
            JSON.stringify({
                streamId: this.state.roomData.id,
                messageType: 'join message',
                senderUsername: username
            }));
    }

    async componentDidMount(){ //TODO: make sure user is logged in
        const roomId = queryString.parse(window.location.search).id;
        console.log(window.location.search);
        await fetch(`https://warm-meadow-92561.herokuapp.com/api/room/getByRoomId?id=${roomId}`)
            .then( (res) => res.json() )
            .then( (roomData) => {
                console.log(roomData);
                const userId = JSON.parse(localStorage.getItem('userData')).id;
                const hostId = roomData.hostId;
                const isHost = userId == hostId;
                this.setState({ roomData, isHost });
                console.log(this.state);
           })
          .catch( (err) => { 
                console.log(err)
                //show error page
           });
      
        //setting up the socket for stream info signalling
        var socket = new window.SockJS('https://warm-meadow-92561.herokuapp.com/meerkat-websocket');
        socket.withCredentials = true;
        const stompClient = Stomp.over(socket);
        this.setState({ stompClient })
        stompClient.connect({}, this.handleSocketConnect);
        
        //setting up adaptor for screen recording and publishing
    }

    handleSocketMessages(content){
        const message = JSON.parse(content.body);
        if(message.messageType == 'start stream') {
            this.setClientVidSrc(message.streamId);
        } else if(message.messageType == 'stop stream') {
            this.setClientVidSrc(null);
        } else if(message.messageType == 'chat message' || message.messageType == 'join message inactive') {
            this.addChatMessage(message);
        } else if(message.messageType == 'join message active') {
            this.setClientVidSrc(message.streamId);
            this.addChatMessage(message);
        }
    }

    addChatMessage(newMessage) {
        let chatMessages = [...this.state.chatMessages, newMessage];
        if(chatMessages.length > 5) {
            chatMessages = chatMessages.slice(1);
        }
        this.setState({ chatMessages });
    }

    handleMessageSubmit(event){
        event.preventDefault();
        const { username } = JSON.parse(localStorage.getItem('userData'));
        this.state.stompClient.send(`/streams/chat/${this.state.roomData.id}`, {}, 
                                    JSON.stringify({
                                        streamId: this.state.roomData.id,
                                        messageType: 'chat message',
                                        messageContent: this.state.chatMesageContent,
                                        senderUsername: username
                                }));
        this.setState({ chatMesageContent: '' });
    }

    handleAdaptorInfo(info, obj){
        if (info == 'initialized') {
            console.log('initialized');
        } else if (info == 'publish_started') {
            this.state.stompClient.send(`/streams/start/${this.state.roomData.id}`, {}, JSON.stringify({'streamId': this.state.roomData.id}));
        } else if (info == 'publish_finished') {
            this.state.stompClient.send(`/streams/stop/${this.state.roomData.id}`, {}, JSON.stringify({'streamId': this.state.roomData.id}));
        } 
    }

    setClientVidSrc(streamId) {
        var videoJsOptions = this.state.videoJsOptions;
        if(streamId != null) {
            videoJsOptions.sources = [{
                src: `http://146.148.93.227:5080/WebRTCApp/streams/${streamId}.m3u8`,
                type: 'application/x-mpegURL'
            }];
        } else {
            videoJsOptions.sources = [{
                src: '',
                type: 'application/x-mpegURL'
            }];
        }
        this.setState({ videoJsOptions });
    }

    async onStreamClick(event) {
        var publishAdaptor = new window.WebRTCAdaptor({
            websocket_url: 'ws://146.148.93.227:5080/WebRTCApp/websocket',
            mediaConstraints: {
                video: 'screen+camera',
                audio: true
            },
            peerconnection_config: null,
            sdp_constraints: {
                OfferToReceiveAudio: false,
                OfferToReceiveVideo: false
            },
            localVideoId: 'stream',
            debug: true,
            callback: this.handleAdaptorInfo,
            callbackError: function(error, message) {
                var errorMessage = JSON.stringify(error);
                if (typeof message != 'undefined') {
                    errorMessage = message;
                }
                console.log('error callback: ' + JSON.stringify(error));
                console.log(errorMessage);
                alert(errorMessage);
            }
        });
        this.setState({ publishAdaptor });
        try {
            this.state.publishAdaptor.publish(this.state.roomData.id);
        } catch(err) {
            console.log(err);
        }
    }

    onStopClick(event){
        this.state.publishAdaptor.stop(this.state.roomData.id);
    }

    render(){
        return (
            <Grid container direction='row' justify='center' alignItems='center'>
                <Grid item direction='row' justify='center' alignItems='center' lg={12}>
                    <h1>Party Room</h1>
                </Grid>
                {
                    this.state.isHost ?
                    <Grid container md={12} justify='center' alignItems='center'>
                        <Grid container direction='column' justify='left' alignItems='center' md={5}>
                            <video 
                                    id='stream' 
                                    controls
                                    width="620" >
                            </video>
                            <button id='btn1' onClick={ this.onStreamClick }>Stream your screen</button>
                            <button id='btn3' onClick={ this.onStopClick}>Stop stream</button>
                        </Grid>
                        <Grid 
                            container 
                            direction='column' 
                            alignItems='baseline' 
                            justify='left' 
                            md={3} 
                            style={{border:'2px solid black', paddingTop:'1%', paddingLeft: '5%', paddingBottom: '5%', backgroundColor: '#9B949C'}}>
                            <h1>Chat</h1>
                                {
                                    this.state.chatMessages.map( (message) => {
                                        if(message.messageType == 'chat message')
                                            return(
                                                <Grid container direction = 'column' justify='left' alignItems='baseline' md={12}>
                                                <p style={{color:'white'}}>{`${message.senderUsername} : ${message.messageContent}`}</p>
                                                </Grid>)
                                        else
                                            return(
                                                <Grid container direction = 'column' justify='left' alignItems='baseline' md={12}>
                                                <p style={{color:'white'}}>{ message.messageContent }</p>
                                                </Grid>)        
                                    })
                                }
                            <Grid container direction='row' alignItems='baseline'>
                                <form onSubmit={this.handleMessageSubmit}>
                                    <TextField 
                                        id='chatbox' 
                                        name='chatbox' 
                                        multiline 
                                        value={this.state.chatMesageContent} 
                                        onChange={ (e) => {this.setState({ chatMesageContent: e.target.value })}}
                                    />
                                    <Input type='submit' value='Send Message'/>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                        :
                    <Grid container md={12} justify='center' alignItems='center'>
                        <Grid container direction='column' justify='left' alignItems='center' md={5}>
                            <VideoPlayer { ...this.state.videoJsOptions } />
                        </Grid>
                        <Grid 
                            container 
                            direction='column' 
                            alignItems='baseline' 
                            justify='left' 
                            md={3} 
                            style={{border:'2px solid black', paddingTop:'1%', paddingLeft: '5%', paddingBottom: '5%', backgroundColor: '#9B949C'}}>
                                <h1>Chat</h1>
                                {
                                    this.state.chatMessages.map( (message) => {
                                        if(message.messageType == 'chat message')
                                            return(
                                                <Grid container direction = 'column' justify='left' alignItems='baseline' md={12}>
                                                <p style={{color:'white'}}>{`${message.senderUsername} : ${message.messageContent}`}</p>
                                                </Grid>)
                                        else
                                            return(
                                                <Grid container direction = 'column' justify='left' alignItems='baseline' md={12}>
                                                <p style={{color:'white'}}>{ message.messageContent }</p>
                                                </Grid>)        
                                    })
                                }
                                <Grid container direction='row' alignItems='baseline'>
                                <form onSubmit={this.handleMessageSubmit}>
                                    <TextField 
                                        id='chatbox' 
                                        name='chatbox' 
                                        multiline 
                                        value={this.state.chatMesageContent} 
                                        onChange={ (e) => {this.setState({ chatMesageContent: e.target.value })}}
                                    />
                                    <Input type='submit' value='Send Message'/>
                                </form>
                            </Grid>
                        </Grid>
                    </Grid>
                    
                }
            </Grid>
        );
    }
}


                            
                                
                            
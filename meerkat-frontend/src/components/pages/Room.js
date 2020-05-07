import React, {Component} from 'react';
import { VideoPlayer } from '../';
import { Stomp } from '@stomp/stompjs';

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
            stompClient: null
        }
        this.onStreamClick = this.onStreamClick.bind(this);
        this.onStopClick = this.onStopClick.bind(this);
        this.setClientVidSrc = this.setClientVidSrc.bind(this);
        this.handleSocketMessages = this.handleSocketMessages.bind(this);
        this.handleAdaptorInfo = this.handleAdaptorInfo.bind(this);
        this.handleSocketConnect = this.handleSocketConnect.bind(this);
    }

    handleSocketConnect(frame) {
        console.log('Connected: ', frame);
        this.state.stompClient.subscribe('/topic/rooms/stream1', this.handleSocketMessages);
    }

    componentDidMount(){
        //setting up the socket for stream info signalling
        var socket = new window.SockJS('http://localhost:8080/meerkat-websocket');
        socket.withCredentials = true;
        const stompClient = Stomp.over(socket);
        this.setState({ stompClient })
        stompClient.connect({}, this.handleSocketConnect);
        
        //setting up adaptor for screen recording and publishing
        var publishAdaptor = new window.WebRTCAdaptor({
            websocket_url: 'ws://localhost:5080/WebRTCApp/websocket',
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
        // console.log(publishAdaptor)
        this.setState({ publishAdaptor });
    }

    handleSocketMessages(content){
        const message = JSON.parse(content.body);
        if(message.messageType == 'start stream') {
            this.setClientVidSrc(message.streamId);
        } else if(message.messageType == 'stop stream') {
            this.setClientVidSrc(null);
        }
        // console.log(message);
    }

    handleAdaptorInfo(info, obj){
        if (info == 'initialized') {
            console.log('initialized');
        } else if (info == 'publish_started') {
            this.state.stompClient.send('/streams/start/stream1', {}, JSON.stringify({'streamId': 'stream1'}));
        } else if (info == 'publish_finished') {
            this.state.stompClient.send('/streams/stop/stream1', {}, JSON.stringify({'streamId': 'stream1'}));
        } 
    }

    setClientVidSrc(streamId) {
        var videoJsOptions = this.state.videoJsOptions;
        if(streamId != null) {
            videoJsOptions.sources = [{
                src: `http://localhost:5080/WebRTCApp/streams/${streamId}.m3u8`,
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

    onStreamClick(event) {
        try {
            this.state.publishAdaptor.publish('stream1');
            // this.state.stompClient.send('/streams/start/stream1', {}, JSON.stringify({'streamId': 'stream1'}));
        } catch(err) {
            console.log(err);
        }
    }

    onStopClick(event){
        this.state.publishAdaptor.stop('stream1');
        // this.state.stompClient.send('/streams/stop/stream1', {}, JSON.stringify({'streamId': 'stream1'}));
    }

    render(){
        return (
            <div>
                <h1>Party Room</h1>
                <video 
                        id='stream' 
                        controls
                        width="620" >
                </video>
                <VideoPlayer { ...this.state.videoJsOptions } />
                <br></br>
                <button id='btn1' onClick={ this.onStreamClick }>Stream your screen</button>
                <button id='btn3' onClick={ this.onStopClick}>Stop stream</button>
                <br></br>
            </div>
        );
    }
}


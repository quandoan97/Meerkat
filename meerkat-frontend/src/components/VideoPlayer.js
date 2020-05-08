import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
  constructor(props){
    super();

    this.state = {
      streamReady: false
    }
  }
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });

    this.player.on('error', () => {
      var myPlayer = this,
      reloadOptions = {};
      reloadOptions.errorInterval = 10;
      // myPlayer.reloadSourceOnError(reloadOptions);
      console.log(myPlayer);

    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    while(!this.state.streamReady && nextProps.sources[0].src !== ""){
      await fetch(nextProps.sources[0].src)
            .then( (res) => {
              console.log(res);
              if(res.ok){
                this.player.src(nextProps.sources);
                this.setState({streamReady:true});
                alert('The stream has started! Click on the play button to view the stream.');
              }
            })
            .catch((err) => {
              console.log(err);
            });
      await new Promise(r => setTimeout(r, 10000));
    }

    if(this.state.streamReady && nextProps.sources[0].src === ""){
      alert('The stream has ended.');
      this.setState({ streamReady: false});
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
        <div style={{ margin: 'auto'}}>
            <div data-vjs-player>
            <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
        </div>
    )
  }
}
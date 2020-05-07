import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    // instantiate Video.js
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    });
  }

  // destroy player on unmount
  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  async componentWillReceiveProps(nextProps) {
    await new Promise(r => setTimeout(r, 10000));
    console.log(nextProps)
    this.player.src(nextProps.sources);
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
        <div style={{width: '50%', margin: 'auto'}}>
            <div data-vjs-player>
            <video ref={ node => this.videoNode = node } className="video-js"></video>
            </div>
        </div>
    )
  }
}
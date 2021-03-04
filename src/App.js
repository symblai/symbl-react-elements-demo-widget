import React, { Component } from "react";
import { SymblProvider, Transcripts, Topics } from '@symblai/react-elements';
// import pfp from './assets/pfp.png';
import Scroll from 'react-scroll';
import './App.css';

var Link = Scroll.Link;
var Element = Scroll.Element;
var scroll = Scroll.animateScroll;

const conversationId = "5828642795945984";
const symblConfig = {
  appId: "69796c58316e6c716245456b63583370316a5a425235696c54497a6a7a437953",
  appSecret: "4f4c395f42686d654d6847324b6a6a7558744144456136367564536f6c5337745a686f75382d4f3576384641647065636f5773524f756944724372625670364d",
};

class App extends Component {


  constructor(props) {
    super();
    this.state = {
      currentTime: null
    }
  }

  handleEvent(event) {
    window.clearInterval(this.interval);
    this.interval = window.setInterval(() => {
      const video = document.querySelector("video");
      let timestamp = this.secondsToTimestamp(video.currentTime);
      let transcriptElement = document.querySelector(`#timestamp-${timestamp}`);
      console.log(`#timestamp-${timestamp}`);
      if (transcriptElement) {
        let containerElement = document.querySelector("#transcription-text");
        let containerPosition = containerElement.getBoundingClientRect().top - containerElement.scrollTop;
        let scrollPosition = transcriptElement.getBoundingClientRect().top;
        scroll.scrollTo(scrollPosition - containerPosition, {
          containerId: "transcription-text"
        });
      }
    }, 1000);
  }

  secondsToTimestamp(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8).substr(3).replace(/\:/g, '');
  }

  timestampToSeconds(minutes, seconds) {
    return Number(minutes) * 60 + Number(seconds);
  }

  scrollTo(event) {
    window.clearInterval(this.interval);
    const video = document.querySelector("video");
    let href = event.target.getAttribute("data-href");
    let timestamp = href.replace(/[\#]timestamp\-/g, "");
    let seconds = this.timestampToSeconds(timestamp.substr(0, 2), timestamp.substr(2, 2));
    video.currentTime = seconds;
    video.play();
    this.handleEvent();
    let containerElement = document.querySelector("#transcription-text");
    let containerPosition = containerElement.getBoundingClientRect().top - containerElement.scrollTop;
    let scrollPosition = document.querySelector(href).getBoundingClientRect().top;
    scroll.scrollTo(scrollPosition - containerPosition, {
      containerId: "transcription-text"
    });
  }

  handleTopicClick(e) {
    console.log('event', e);
  }

  render() {

    return (
      <SymblProvider config={symblConfig}>
        <div id="transcription-widget">
          <div className="widget-body">
            <div className="section">
              <div className="content">
                <div className="section-body">
                  <div className="panes">
                    <div className="pane">
                      <p>Symbl.ai shows you important topics discussed in the meeting. <br /><a href="https://docs.symbl.ai/docs/">Learn more about our API.</a></p>
                      <div className="detected-topics">
                        <h4>Detected topics for video</h4>
                        <Topics
                          conversationId={conversationId}
                          confidenceThreshold={0.8}
                          orderBy={'score'}
                          onTopicClick={this.handleTopicClick}
                        />
                      </div>
                    </div>
                    <div className="pane">
                      <h4>Demo Conversion Video</h4>
                      <video onPlay={(e) => this.handleEvent(e)} className="jss33" controls><source src="https://storage.googleapis.com/website-videos-1/video.mp4" type="video/mp4" />Your browser does not support the video tag.</video>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="transcription">
                    <div className="transcription-info">
                      <h4>Speech to Text</h4>
                      <p>Symbl.ai provides state of the art Speech to Text.</p>
                      <p><a href="https://docs.symbl.ai/docs/">Learn more about our API</a></p>
                    </div>
                    <div className="transcription-text" id="transcription-text">

                      
                        <Transcripts
                          conversationId={conversationId}
                          highlightPhrases={['action_phrase']}
                          transcriptsWrapperClassName="testWrapperClass"
                          transcriptRowClassName="testClassRow"
                          transcriptRowHeaderClassName=""
                          transcriptClassName=""
                          avatarClassName="avatarClass"
                        />

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SymblProvider>
    );
  }
}

export default App;

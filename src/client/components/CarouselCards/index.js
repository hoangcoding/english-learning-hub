import React, {Component} from 'react';
import LessonCard from '../LessonCard';
import './index.scss';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ReactCardFlip from 'react-card-flip';
import {setProgress} from '../../containers/Lessons/lessons.action';
import { Icon } from 'antd';

class CarouselCards extends Component {
  constructor(props) {
    super(props);
      this.state = {
      isFlipped: false,
      isSpeakerClicked: false,
    };
  }
  
  handleCardClicked(word, topic) {
    this.setState({
      isFlipped: !this.state.isFlipped,
      isSpeakerClicked: false
    });
    if(word, topic){
      this.props.setProgress(word, topic);
    }
  }
  
  handleSpeakerClicked(word){
    this.setState({isSpeakerClicked: true});
    const parameters = {
      onend: () => {
        this.setState({isSpeakerClicked: false});
      }
    }
    window.responsiveVoice.speak(word, "UK English Female", parameters)
  }

  render(){
    let lessons;
    if(this.props.lessons && this.props.lessons.list){
      lessons = this.props.lessons.list
    }
    const children = lessons.map((lesson, i) => {
      return (
        <div key={i.toString()}>
          <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="horizontal" className="img-wrapper">
            <div key="front" onClick={() => {this.handleCardClicked(lesson.word, this.props.lessons.topic)}}>
              <img src={lesson.image} alt="Avatar" style={{width: "250px", height: "300px"}} />
            </div>
            <div key="back" 
              className="flip-card-back" 
            >
              <div><Icon type="sound" className="word-speaker" onClick={()=> {this.handleSpeakerClicked(lesson.word)}} theme={this.state.isSpeakerClicked? "filled" : "outlined"}/></div>
              <div onClick={()=> {this.handleCardClicked()}} className="word">{lesson.word}</div>
            </div>
          </ReactCardFlip>
        </div>
      )
    });
    return (
      <div className="carousel-demo-wrapper">
        <LessonCard className="carousel-demo" childMaxLength={10}>
          {children}
        </LessonCard>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lessons: state.lessons.get("lessons"),
});

const mapDispatchToProps = {
  setProgress,
};

export default withRouter(
  connect(
      mapStateToProps,
      mapDispatchToProps
  )(CarouselCards)
);

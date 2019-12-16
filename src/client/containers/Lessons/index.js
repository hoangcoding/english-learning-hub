import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import CarouselCards from '../../components/CarouselCards';
import {loadLessons } from '../Lessons/lessons.action';
import ProgressBar from '../../components/ProgressBar';

class Lessons extends Component{
    componentDidMount() {
        const topic = this.props.match.params.topic;
        this.props.loadLessons(topic);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.topic !== this.props.match.params.topic){
            this.props.loadLessons(this.props.match.params.topic);
        }
    }
    render(){
        let progressPercent;
        const domainTopic = this.props.match.params.topic;
        const progressTopic = this.props.progress.topic;
        if(domainTopic === progressTopic){
            progressPercent = 
                (Number(this.props.progress.progress) > Number(this.props.lessons.progress))? 
                Number(this.props.progress.progress) 
                : Number(this.props.lessons.progress)
        }
        else progressPercent = Number(this.props.lessons.progress)
        return (
            <div className="lessonContainer">
                <ProgressBar 
                    progress={progressPercent}
                />
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    {this.props.lessons && this.props.lessons.list &&
                        <CarouselCards lessons={this.props.lessons.list} updateProgress={this.updateProgress}/>
                    }
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    lessons: state.lessons.get("lessons"),
    progress: state.lessons.get("progress")
});

const mapDispatchToProps = {
    loadLessons,
};

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Lessons)
);
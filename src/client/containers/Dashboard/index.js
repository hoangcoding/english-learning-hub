import React from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {
    loadWords,
    loadLessons
} from './dashboard.action';
import TopicWithProgress from "../../components/TopicWithProgress";
import WordList from "../../components/WordList";
import {Skeleton} from "antd";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.props.loadWords();
        this.props.loadLessons();
    }

    renderTopics = () => {
        const {dashboard} = this.props;
        return dashboard.get('lessons').map((lesson, index) => (
            <TopicWithProgress key={index} percentage={parseFloat(lesson.get('progress'))}
                               topic={lesson.get('topic')}/>
        ));
    };

    generateWordDataSource = () => {
        const {dashboard} = this.props;
        const dataSource = [];
        dashboard.get('words').map(word => {
           dataSource.push({
           });
        });
    };

    render() {
        return <>
            <Skeleton loading={this.props.dashboard.get('isLoading')}>
                <h1 className="text-3xl mb-5 text-center">Topics and progresses</h1>
                <div className="flex flex-wrap mb-4">
                    {this.renderTopics()}
                </div>
                <h1 className="text-3xl mb-5 text-center">New vocabularies</h1>
                    <WordList words={this.props.dashboard.get('words')}/>
            </Skeleton>
        </>;
    }
}

const mapStateToProps = state => ({
    dashboard: state.dashboard,
});
const mapDispatchToProps = {
    loadWords,
    loadLessons
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Dashboard)
);

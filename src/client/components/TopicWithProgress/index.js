import React from 'react';
import {Progress} from 'antd';
import {Link} from 'react-router-dom';


const TopicWithProgress = (props) => (
    <div className="w-1/2 md:w-1/4 lg:w-1/5 p-3">
        <Link to={`dashboard/lessons/${props.topic}`}>
            <div className="shadow p-2 rounded-lg hover:bg-teal-300 cursor-pointer">
                <Progress className="mx-auto block text-center" type="dashboard" percent={props.percentage}/>
                <h2 className="text-center text-lg text-green-900 font-semibold">{props.topic}</h2>
            </div>
        </Link>
    </div>
);

export default TopicWithProgress;
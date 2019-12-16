import React, {Component} from 'react';

import {List, Avatar} from 'antd';

class WordList extends React.Component {
    data = [
        {
            title: 'Ant Design Title 1',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        },
        {
            title: 'Ant Design Title 2',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        },
        {
            title: 'Ant Design Title 3',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        },
        {
            title: 'Ant Design Title 4',
            content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
        },
    ];

    render() {
        return (
            <List
                itemLayout="vertical"
                size="large"
                dataSource={this.props.words}
                renderItem={item => (
                    <List.Item extra={
                        <div style={{width: 150}} className="flex">
                            <img
                                className="block"
                                alt="logo"
                                src={item.get('image')}
                            />
                        </div>
                    }>
                        < List.Item.Meta
                            title={item.get('word')}
                        />
                        {item.get('description')}
                    </List.Item>
                )}
            />
        );
    }
}

export default WordList;
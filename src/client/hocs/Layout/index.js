import React from "react";
import SiteFooter from "../../containers/Footer";
import SiteHeader from "../../containers/Header";

import {Layout} from 'antd';

const {Header, Footer, Sider, Content} = Layout;

function withLayout(BaseComponent) {
    function HomeLayout(props) {
        return (
            <Layout>
                <Header><SiteHeader {...props} /></Header>
                <Content style={{background: '#fff', minHeight: "calc(100vh - 133px)"}}>
                    <div className="container mx-auto mt-2 mb-2" >
                        <BaseComponent {...props} />
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}><SiteFooter {...props} /></Footer>
            </Layout>
        );
    }

    return HomeLayout;
}

export default withLayout;

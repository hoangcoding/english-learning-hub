import React from "react";

import { connect } from "react-redux";
import { push } from 'connected-react-router'

export default function(ComposedComponent) {
    class Authenticate extends React.Component {
        componentDidMount() {
            this._checkAndRedirect();
        }

        componentDidUpdate() {
            this._checkAndRedirect();
        }

        _checkAndRedirect() {
            const { isAuthenticated, push } = this.props;

            if (!isAuthenticated) {
                push('/');
            }
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated ? (
                        <ComposedComponent {...this.props} />
                    ) : null}
                </div>
            );
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: state.authentication.login.get("isAuthenticated")
        };
    };
    return connect(
        mapStateToProps,
        {push}
    )(Authenticate);
}

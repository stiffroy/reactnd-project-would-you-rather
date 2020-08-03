import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { ContentBlock } from '../utils/helpers'
import MainNav from "./MainNav";
import Login from "./Login";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }

    render() {
        const { authUser } = this.props;

        return (
            <BrowserRouter>
                <div className="App">
                    {authUser === null ? (
                        <Route
                            render={() => (
                                <ContentBlock>
                                    <Login />
                                </ContentBlock>
                            )}
                        />
                    ) : (
                    <Fragment>
                        <MainNav />
                        <ContentBlock>
                            User Logged in
                        </ContentBlock>
                    </Fragment>
                )}
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps({ authUser }) {
    return {
        authUser
    }
}

export default connect(mapStateToProps)(App)

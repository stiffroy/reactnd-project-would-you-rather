import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { ContentBlock } from '../utils/helpers'
import { ROUTES } from '../utils/routes'
import MainNav from "./MainNav"
import Login from "./Login"
import Dashboard from "./Dashboard"
import NotFound from "./NotFound"
import NewQuestion from "./NewQuestion";
import ViewQuestion from "./ViewQuestion";
import LeaderBoard from "./LeaderBoard";

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData()
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
                            <Switch>
                                <Route path={ROUTES.home} component={Dashboard} exact />
                                <Route path={ROUTES.new_poll} component={NewQuestion} />
                                <Route path={ROUTES.view_poll} component={ViewQuestion} />
                                <Route path={ROUTES.leaderboard} component={LeaderBoard} />
                                <Route component={NotFound} />
                            </Switch>
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

export default connect(mapStateToProps, {handleInitialData})(App)

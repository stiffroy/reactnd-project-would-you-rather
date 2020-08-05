import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
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

const PrivateRoute = ({ component: Component,  ...rest }) => (
    <Route {...rest} render={(props) => (
        !!rest.authUser === true
            ? <Component {...props} />
            : <Redirect to={{
                pathname: ROUTES.login,
                state: { referrer: props.location.pathname }
            }} />
    )}/>
)

class App extends Component {
    componentDidMount() {
        this.props.handleInitialData()
    }

    render() {
        const { authUser } = this.props;

        return (
            <BrowserRouter>
                <div className="App">
                    <Fragment>
                        <MainNav />
                        <ContentBlock>
                            <Switch>
                                <Route path={ROUTES.login} component={Login} />
                                <PrivateRoute path={ROUTES.home} component={Dashboard} authUser={authUser} exact />
                                <PrivateRoute path={ROUTES.new_poll} component={NewQuestion} authUser={authUser} />
                                <PrivateRoute path={ROUTES.view_poll} component={ViewQuestion} authUser={authUser} />
                                <PrivateRoute path={ROUTES.leaderboard} component={LeaderBoard} authUser={authUser} />
                                <Route component={NotFound} />
                            </Switch>
                        </ContentBlock>
                    </Fragment>
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

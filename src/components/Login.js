import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthUser } from '../actions/authUser'
import { ROUTES } from '../utils/routes'
import { Redirect } from 'react-router-dom'
import {
    Segment,
    Grid,
    Header,
    Image,
    Form,
    Loader,
    Dimmer
} from 'semantic-ui-react'

class Login extends Component {
    state = {
        user: null,
        loading: false,
        redirectToReferrer: false,
    }
    formatDropdownData = () => {
        const { users } = this.props

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            image: { avatar: true, src: user.avatarURL }
        }));
    }
    onChange = (e, { value }) => {
        this.setState({
            user: value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()

        const { setAuthUser } = this.props
        const user = this.state.user

        new Promise((res, rej) => {
            setAuthUser(user)
            setTimeout(() => res(), 1000)
        }).then(() => console.log('user authenticated'))

        this.setState({
            redirectToReferrer: true
        })
    }
    render() {
        const { user, loading, redirectToReferrer } = this.state
        const referrer = this.props.location.state ? this.props.location.state.referrer : false
        const redirectTo = referrer && referrer === ROUTES.login ? ROUTES.home : referrer

        if (redirectToReferrer === true) {
            return <Redirect to={redirectTo} />
        }

        return (
            <Fragment>
                <Segment.Group>
                    <Header as="h4" block attached="top" textAlign="center">
                        <Header.Content>Would You Rather App!</Header.Content>
                        <Header.Subheader>Please sign in to continue</Header.Subheader>
                    </Header>
                    <div>
                        <Grid padded textAlign="center">
                            <Grid.Row className="login">
                                <Grid.Column width={16}>
                                    {loading === true && (
                                        <Dimmer active inverted>
                                            <Loader inverted content="Loading" />
                                        </Dimmer>
                                    )}
                                    <Image src="/logo192.png" size="small" centered />
                                    <br />
                                    <Form onSubmit={this.handleSubmit}>
                                        <Header as="h2" color="green">
                                            Sign In
                                        </Header>
                                        <Form.Dropdown
                                            placeholder="Select a Friend"
                                            fluid
                                            selection
                                            scrolling
                                            options={this.formatDropdownData()}
                                            value={user}
                                            onChange={this.onChange}
                                            required
                                        />
                                        <Form.Button content="Login" positive disabled={!user} fluid />
                                    </Form>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </div>
                </Segment.Group>
                <footer className="footer">
                    <p className="center aligned">Icons made by <a href="https://www.flaticon.com/authors/vitaly-gorbachev" title="Vitaly Gorbachev">Vitaly Gorbachev</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
                </footer>
            </Fragment>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users: Object.values(users)
    }
}

export default connect(mapStateToProps, { setAuthUser })(Login)
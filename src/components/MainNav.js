import React, { Component } from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { ROUTES } from '../utils/routes'
import {
    Menu,
    Image,
    Button,
    Container
} from 'semantic-ui-react'
import { setAuthUser } from '../actions/authUser'

class MainNav extends Component {
    componentDidMount() {

    }
    handleLogout = (e) => {
        e.preventDefault()
        const { setAuthUser } = this.props
        setAuthUser(null)
    }

    render() {
        const { authUser, users } = this.props

        return(
            <Container>
                <Menu pointing>
                    <Menu.Item name="home" as={NavLink} to={ROUTES.home} exact />
                    <Menu.Item name="new poll" as={NavLink} to={ROUTES.new_poll} />
                    <Menu.Item name="leader board" as={NavLink} to={ROUTES.leaderboard} />
                    {authUser &&  (
                        <Menu.Menu position="right">
                            <Menu.Item>
                            <div>
                                <span>Hello, {users[authUser].name}</span>
                                <Image
                                    src={users[authUser].avatarURL}
                                    avatar
                                    spaced="left"
                                    circular
                                    className="bordered"
                                />
                            </div>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    content="Logout"
                                    labelPosition="right"
                                    basic
                                    compact
                                    icon="log out"
                                    size="mini"
                                    onClick={this.handleLogout}
                                />
                            </Menu.Item>
                        </Menu.Menu>
                    )}
                </Menu>
            </Container>
        )
    }
}

function mapStateToProps({ authUser, users }) {
    return {
        authUser,
        users
    };
}

export default connect(mapStateToProps, {setAuthUser})(MainNav)
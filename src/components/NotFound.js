import React from 'react';
import { Container, Header } from 'semantic-ui-react'
import { Link } from "react-router-dom"
import { ROUTES } from '../utils/routes'

class NotFound extends React.Component {
    render() {
        return (
            <Container textAlign="center">
                <Header as="h2">Page Not Found</Header>
                <p>Go to <Link to={ROUTES.home}>home</Link></p>
            </Container>
        )
    }
}

export default NotFound
import React from 'react';
import { Container, Header } from 'semantic-ui-react';
import { Link } from "react-router-dom";

class NotFound extends React.Component {
    render() {
        return (
            <Container textAlign="center">
                <Header as="h2">Page Not Found</Header>
                <p>Go to <Link to='/'>home</Link></p>
            </Container>
        )
    }
}

export default NotFound
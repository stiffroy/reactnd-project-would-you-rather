import React, {Component} from "react"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import PropTypes from "prop-types"
import { ROUTES } from '../utils/routes'
import {
    Segment,
    Header,
    Grid,
    Dimmer,
    Loader,
    Form,
    Divider,
} from "semantic-ui-react";
import {handleAddQuestion} from "../actions/questions"

class NewQuestion extends Component {
    static propTypes = {
        authUser: PropTypes.string.isRequired,
        handleAddQuestion: PropTypes.func.isRequired
    }

    state = {
        optionOne: '',
        optionTwo: '',
        success: false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        new Promise((response, reject) => {
            const {authUser, handleAddQuestion} = this.props
            handleAddQuestion(this.state.optionOne, this.state.optionTwo, authUser)
            setTimeout(() => response('success'), 1000)
        }).then(() => {
            this.setState({
                optionOne: '',
                optionTwo: '',
                success: true
            })
        })
    }

    render() {
        const disabled = !this.state.optionOne || !this.state.optionTwo

        if (this.state.success) {
            return <Redirect to={ROUTES.home} />
        }

        return (
            <Segment.Group>
                <Header as="h3" textAlign="left" block attached="top">
                    Create a New Poll
                </Header>
                <Grid padded>
                    <Grid.Column>
                        {this.state.isLoading && (
                            <Dimmer active inverted>
                                <Loader content="Updating" />
                            </Dimmer>
                        )}
                        <p>
                            <strong>Would you rather...</strong>
                        </p>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                id="optionOne"
                                placeholder="Enter option one..."
                                value={this.state.optionOne}
                                onChange={this.handleChange}
                                required
                            />
                            <Divider horizontal>Or</Divider>
                            <Form.Input
                                id="optionTwo"
                                placeholder="Enter option two..."
                                value={this.state.optionTwo}
                                onChange={this.handleChange}
                                required
                            />
                            <Form.Button positive size="tiny" fluid disabled={disabled}>
                                Create
                            </Form.Button>
                        </Form>
                    </Grid.Column>
                </Grid>
            </Segment.Group>
        )
    }
}

function mapStateToProps({ authUser, questions }) {
    return {
        authUser,
        questions
    }
}

export default connect(mapStateToProps, {handleAddQuestion})(NewQuestion)
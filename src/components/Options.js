import React, {Component, Fragment} from "react"
import PropTypes from 'prop-types'
import {connect} from "react-redux"
import {handleAnswerQuestion} from '../actions/users'
import {
    Header,
    Button,
    Divider,
    Form,
    Radio
} from 'semantic-ui-react'

export class Options extends Component {
    static propTypes = {
        question: PropTypes.object.isRequired,
    }

    state = {
        value: null
    }

    handleView = (e) => {
        e.preventDefault()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.state.value !== '') {
            const { authUser, question, handleAnswerQuestion } = this.props
            handleAnswerQuestion(authUser, question.id, this.state.value)
            //Todo go to the question details page after submit
        }
    }

    handleChange = (e, {value}) => {
        this.setState({
            value
        })

        console.log('value', value)
        console.log('state', this.state)
    }

    render() {
        const { question, users, authUser } = this.props
        const answered = Object.keys(users[authUser].answers).includes(question.id)
        const disabled = !this.state.value

        return (
            <Fragment>
                <Header as="h5" textAlign="left">
                    Would you rather
                </Header>
                {answered ? (
                    <div>
                        <p style={{ textAlign: 'center' }}>
                            {question.optionOne.text}
                        </p>
                        <Divider horizontal>Or</Divider>
                        <p style={{ textAlign: 'center' }}>
                            {question.optionTwo.text}
                        </p>
                        <Button
                            color={"green"}
                            size="tiny"
                            fluid
                            onClick={this.handleView}
                            content="View Results"
                        />
                    </div>
                ) : (
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Radio
                                label={question.optionOne.text}
                                name="radioGroup"
                                value="optionOne"
                                checked={this.state.value === 'optionOne'}
                                onChange={this.handleChange}
                            />
                            <Divider horizontal>Or</Divider>
                            <Radio
                                label={question.optionTwo.text}
                                name="radioGroup"
                                value="optionTwo"
                                checked={this.state.value === 'optionTwo'}
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Button
                                color="green"
                                size="tiny"
                                fluid
                                positive
                                disabled={disabled}
                                content="Submit"
                            />
                        </Form.Field>
                    </Form>
                )}
            </Fragment>
        )
    }
}

function mapStateToProps({ authUser, users }) {
    return {
        authUser,
        users
    }
}

export default connect(mapStateToProps, {handleAnswerQuestion})(Options)
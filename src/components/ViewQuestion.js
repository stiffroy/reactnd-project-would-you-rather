import React, {Component, Fragment} from "react"
import {connect} from "react-redux"
import PropTypes from "prop-types"
import { ROUTES } from '../utils/routes'
import {
    Header,
    Segment,
    Progress,
    Button,
    Label,
    Icon
} from "semantic-ui-react"
import {Link} from "react-router-dom";

class ViewQuestion extends Component {
    static propTypes = {
        questions: PropTypes.object.isRequired,
        user: PropTypes.object.isRequired
    }

    render() {
        const {questions, user, match} = this.props
        const question = questions[match.params.question_id]

        if (!question) {
            return (
                <Fragment>
                    <Header as="h2">
                        Bad Question
                        <Header.Subheader>
                            Please make sure you have selected the right question
                        </Header.Subheader>
                    </Header>
                    <p>Go back to <Link to={ROUTES.home}>home</Link></p>
                </Fragment>
            )
        }

        const votesOptionOne = question.optionOne.votes.length
        const votesOptionTwo = question.optionTwo.votes.length
        const votesTotal = votesOptionOne + votesOptionTwo
        const voteUser = user.answers[question.id]
        const winner = '#5EB54A', looser = '#fc6a4f', tie = '#f3f042'
        let optionOne, optionTwo

        if (votesOptionOne === votesOptionTwo) {
            optionOne = tie
            optionTwo = tie
        } else if (votesOptionOne > votesOptionTwo) {
            optionOne = winner
            optionTwo = looser
        } else {
            optionOne = looser
            optionTwo = winner
        }

        return (
            <Fragment>
                <Header as="h2">
                    Results:
                    <Header.Subheader>
                        Would you rather
                    </Header.Subheader>
                </Header>
                <Segment
                    color='grey'
                    style={{ backgroundColor: `${optionOne}` }}
                >
                    {voteUser === 'optionOne' && <UserVoteLabel />}
                    <p style={{ fontWeight: 'bold' }}>{question.optionOne.text}</p>
                    <Progress
                        percent={((votesOptionOne / votesTotal) * 100).toFixed(2)}
                        progress
                        color="blue"
                    >
                        {votesOptionOne} out of {votesTotal} votes
                    </Progress>
                </Segment>
                <Segment
                    color='grey'
                    style={{ backgroundColor: `${optionTwo}` }}
                >
                    {voteUser === 'optionTwo' && <UserVoteLabel />}
                    <p style={{ fontWeight: 'bold' }}>{question.optionTwo.text}</p>
                    <Progress
                        percent={((votesOptionTwo / votesTotal) * 100).toFixed(2)}
                        progress
                        color="blue"
                    >
                        {votesOptionTwo} out of {votesTotal} votes
                    </Progress>
                </Segment>
                <Link to={ROUTES.home} >
                    <Button size="tiny" floated="right" color={"blue"}>
                        Back
                    </Button>
                </Link>
            </Fragment>
        )
    }
}

const UserVoteLabel = () => (
    <Label color="teal" ribbon="right" className="vote">
        <Icon name="check circle outline" size="big" className="compact" />
        <div style={{ float: 'right' }}>
            Your
            <br />
            Vote
        </div>
    </Label>
)

function mapStateToProps({ users, authUser, questions }) {
    const user = users[authUser]
    return {
        user,
        questions
    }
}

export default connect(mapStateToProps)(ViewQuestion)
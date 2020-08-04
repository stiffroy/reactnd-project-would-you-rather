import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import QuestionCard from "./QuestionCard"
import { Tab } from 'semantic-ui-react'

class Dashboard extends Component {
    static propTypes = {
        userQuestionData: PropTypes.object.isRequired
    }
    render() {
        const { userQuestionData } = this.props

        return <Tab panes={questionPanes({ userQuestionData })} className="tab" />
    }
}

const questionPanes = props => {
    const { userQuestionData } = props;
    return [
        {
            menuItem: 'Unanswered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.answeredQuestions.map(question => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </Tab.Pane>
            )
        },
        {
            menuItem: 'Answered',
            render: () => (
                <Tab.Pane>
                    {userQuestionData.unansweredQuestions.map(question => (
                        <QuestionCard key={question.id} question={question} />
                    ))}
                </Tab.Pane>
            )
        }
    ]
}

function mapStateToProps({ authUser = null, users = {}, questions = {} }) {
    const answeredQuestionIds = Object.keys(users[authUser].answers)
    const answeredQuestions = Object.values(questions)
        .filter(question => !answeredQuestionIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)
    const unansweredQuestions = Object.values(questions)
        .filter(question => answeredQuestionIds.includes(question.id))
        .sort((a, b) => b.timestamp - a.timestamp)

    return {
        userQuestionData: {
            answeredQuestions,
            unansweredQuestions
        }
    }
}

export default connect(mapStateToProps)(Dashboard)
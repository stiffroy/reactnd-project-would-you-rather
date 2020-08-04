import React, {Component} from "react"
import {connect} from "react-redux"
import Options from "./Options"
import {
    Segment,
    Header,
    Grid,
    Image
} from 'semantic-ui-react'

export class QuestionCard extends Component {
    render() {
        const { question, users } = this.props

        return (
            <Segment.Group>
                <Header
                    as="h5"
                    textAlign="left"
                    block
                    attached="top"
                >
                    {users[question.author].name} asks:
                </Header>

                <Grid divided padded>
                    <Grid.Row>
                        <Grid.Column width={5}>
                            <Image src={users[question.author].avatarURL} size={"medium"} />
                        </Grid.Column>
                        <Grid.Column width={11}>
                            <Options question={question} />
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment.Group>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default connect(mapStateToProps)(QuestionCard)
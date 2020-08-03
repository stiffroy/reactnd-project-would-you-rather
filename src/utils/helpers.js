import React from "react";
import {Grid} from "semantic-ui-react";

export const APP_MAX_WIDTH = 650

export const ContentBlock = ({ children }) => (
    <Grid padded="vertically" columns={1} centered>
        <Grid.Row>
            <Grid.Column style={{ maxWidth: APP_MAX_WIDTH }}>{children}</Grid.Column>
        </Grid.Row>
    </Grid>
);

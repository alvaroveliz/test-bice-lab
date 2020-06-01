import React from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { Card, CardActionArea, CardContent, Box, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IndicatorValue } from '../../interfaces/Indicators';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        indicatorCardAction: {
            height: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        indicatorCardContent: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        indicatorKey: {
            color: 'white',
            textTransform: 'uppercase',
        },
        indicatorValue: {
            color: 'white',
            textTransform: 'uppercase',
        },
        indicatorName: {
            color: '#9cb3e3',
            textAlign: 'center',
            fontSize: '0.9em',
        },
    }),
);

interface Props extends RouteComponentProps {
    indicator: IndicatorValue;
}

const Indicator: React.FC<Props> = (props): React.ReactElement => {
    const { indicator, history } = props;
    const classes = useStyles();

    return (
        <Card>
            <CardActionArea
                className={classes.indicatorCardAction}
                onClick={() => {
                    history.push(`/${indicator.key}/serie`);
                }}
            >
                <CardContent key="cobre" className={classes.indicatorCardContent}>
                    <Box p={2}>
                        <Typography align="center" variant="subtitle1" className={classes.indicatorKey}>
                            {indicator.key}
                        </Typography>
                        <Typography align="center" variant="h4" className={classes.indicatorValue}>
                            <NumberFormat
                                value={indicator.value}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                prefix={'$'}
                                decimalSeparator={','}
                            ></NumberFormat>
                        </Typography>
                        <Typography align="center" className={classes.indicatorName}>
                            {indicator.name}
                        </Typography>
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default withRouter(Indicator);

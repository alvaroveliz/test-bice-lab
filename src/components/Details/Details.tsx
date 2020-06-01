import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {
    Grid,
    Card,
    Box,
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Link,
} from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { IndicatorValue } from '../../interfaces/Indicators';
import Indicator from '../Indicator';

interface RouteParams {
    indicatorKey: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        chartCard: {
            marginBottom: theme.spacing(4),
        },
        table: {},
        tableHeader: {
            color: '#FFF',
            fontWeight: 'bold',
        },
        tableCell: {
            color: '#FFF',
            fontSize: 10,
        },
        backButton: {
            padding: 20,
            textAlign: 'center',
            color: 'white',
            cursor: 'pointer',
        },
    }),
);

interface Props extends RouteComponentProps<RouteParams> {}

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

const Details: React.FC<Props> = ({ history, match }): React.ReactElement => {
    const [indicator, setIndicator] = useState<IndicatorValue>();
    const [chartData, setChartData] = useState();
    const [tableData, setTableData] = useState();
    const { params } = match;
    const classes = useStyles();

    useEffect(() => {
        const fetchIndicator = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/indicators/${params.indicatorKey}/values`);
                const data = await response.data;
                const indicator = { value: data.values[0].value, ...data };
                const dataLabels = data.values.map((dataValue: any) => {
                    return moment.unix(dataValue.date).format('DD-MM-yyyy');
                });
                const dataValues = data.values.map((dataValue: any) => {
                    return dataValue.value;
                });
                setIndicator(indicator);

                const dataSet = {
                    labels: dataLabels,
                    datasets: [
                        {
                            data: dataValues,
                            backgroundColor: 'rgba(0,0,0,0.2)',
                            label: data.key,
                        },
                    ],
                };

                setChartData(dataSet);
                setTableData(data.values);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIndicator();
    }, [params]);

    const options = {
        legend: {
            labels: {
                fontColor: 'white',
                fontSize: 14,
            },
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        callback: (label: any, index: any, labels: any) => {
                            return '$' + label;
                        },
                        fontColor: 'white',
                        fontSize: 12,
                        stepSize: 100,
                    },
                },
            ],
            xAxes: [
                {
                    ticks: {
                        fontColor: 'white',
                        fontSize: 12,
                    },
                },
            ],
        },
    };

    return (
        <>
            {indicator && chartData && tableData && (
                <Grid container spacing={6}>
                    <Grid item lg={4} xs={12}>
                        <Indicator indicator={indicator}></Indicator>
                        <Link
                            className={classes.backButton}
                            align="center"
                            component="div"
                            onClick={() => {
                                history.push('/');
                            }}
                        >
                            Regresar
                        </Link>
                    </Grid>
                    <Grid item lg={8} xs={12}>
                        <Card className={classes.chartCard}>
                            <Box p={2}>
                                <Line data={chartData} options={options}></Line>
                            </Box>
                        </Card>
                        <TableContainer component={Card}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeader}>Fecha</TableCell>
                                        <TableCell align="right" className={classes.tableHeader}>
                                            Valor
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tableData.map((row: any, key: number) => {
                                        return (
                                            <TableRow key={key}>
                                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                                    {moment.unix(row.date).format('DD-MM-yyyy')}
                                                </TableCell>
                                                <TableCell align="right" className={classes.tableCell}>
                                                    <NumberFormat
                                                        value={row.value}
                                                        displayType={'text'}
                                                        thousandSeparator={'.'}
                                                        prefix={'$'}
                                                        decimalSeparator={','}
                                                    ></NumberFormat>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default withRouter(Details);

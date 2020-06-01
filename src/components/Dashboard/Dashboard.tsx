import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Indicator from '../Indicator';
import { Indicators } from '../../interfaces/Indicators';

const apiEndPoint = process.env.REACT_APP_API_ENDPOINT;

const Dashboard: React.FC = (): React.ReactElement => {
    const [indicators, setIndicators] = useState<Indicators>();

    useEffect(() => {
        const fetchIndicators = async () => {
            try {
                const response = await axios.get(`${apiEndPoint}/api/indicators/last`);
                setIndicators(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchIndicators();
    }, []);

    return (
        <>
            {indicators && (
                <Grid container spacing={2} justify="center">
                    <Grid item lg={3} md={6} xs={12} key={indicators.cobre.key}>
                        <Indicator indicator={indicators.cobre}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.dolar.key}>
                        <Indicator indicator={indicators.dolar}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.euro.key}>
                        <Indicator indicator={indicators.euro}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.ipc.key}>
                        <Indicator indicator={indicators.ipc}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.ivp.key}>
                        <Indicator indicator={indicators.ivp}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.oro.key}>
                        <Indicator indicator={indicators.oro}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.plata.key}>
                        <Indicator indicator={indicators.plata}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.uf.key}>
                        <Indicator indicator={indicators.uf}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.utm.key}>
                        <Indicator indicator={indicators.utm}></Indicator>
                    </Grid>
                    <Grid item lg={3} md={6} xs={12} key={indicators.yen.key}>
                        <Indicator indicator={indicators.yen}></Indicator>
                    </Grid>
                </Grid>
            )}
        </>
    );
};

export default Dashboard;

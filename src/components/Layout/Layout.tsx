import React from 'react';
import { Container, Grid, Typography, Box, Link } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        layout: {
            marginTop: theme.spacing(4),
            marginBottom: theme.spacing(4),
        },
        title: {
            color: '#FFF',
            fontWeight: 'bold',
            textAlign: 'center',
            padding: 20,
            width: '100%',
        },
        footerBox: {
            textAlign: 'center',
        },
    }),
);

const Layout: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.layout}>
            <Container maxWidth="lg">
                <Grid container>
                    <Typography variant="h4" align="center" component="div" className={classes.title}>
                        Indicadores Económicos
                    </Typography>
                    <Grid item xs={12}>
                        {props.children}
                    </Grid>
                    <Grid item xs={12}>
                        <Box p={4} className={classes.footerBox}>
                            <Link href="/profile">
                                <Typography variant="overline">Sobre mí</Typography>
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default Layout;

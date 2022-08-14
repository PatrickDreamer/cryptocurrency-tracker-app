import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Hidden from '@mui/material/Hidden';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Box
                backgroundColor={theme.palette.background.default}
                paddingTop={1}
                paddingBottom={1}
                // sticky footer - see four values below
                position='static'
                bottom='0'
                left='0'
                width='100%'
            >
                <Divider />
                <Box
                    backgroundColor={theme.palette.background.default}
                    position='relative'
                    padding={theme.spacing(0.25)}
                >
                    <Grid container spacing={0}>
                        
                        <Grid container item xs={12} md={4} justifyContent='left'>
                            <List>
                                <ListItemButton>
                                    <ListItemText 
                                        primary={
                                            <Typography 
                                                variant='body2'
                                                color={theme.palette.text.secondary}
                                            >
                                                Copyright &copy; Patrick 2022.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </Grid>

                        <Grid container item xs={12} md={4} justifyContent='center'>
                            <List>
                                <ListItemButton>
                                    <ListItemText 
                                        primary={
                                            <Typography 
                                                variant='body2'
                                                color={theme.palette.text.secondary}
                                            >
                                                Data obtained from
                                                {' '}
                                                <Link 
                                                    href='https://www.coingecko.com/'
                                                    alt='CoinGecko'
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    color={theme.palette.text.secondary}
                                                >
                                                    CoinGecko
                                                </Link>.
                                            </Typography>
                                        }
                                    />
                                </ListItemButton>
                            </List>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    );
};

export default Footer;
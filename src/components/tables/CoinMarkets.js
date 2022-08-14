import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import InputAdornment from '@mui/material/InputAdornment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import SvgIcon from '@mui/material/SvgIcon';
import { useTheme } from '@mui/material/styles';

import TablePaginationActions from './TablePaginationActions';

const CoinMarkets = () => {
    const theme = useTheme();

    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    const filteredCoins = coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );
  
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };

    const fetchCoinMarkets = () => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=USD&order=market_cap_desc&per_page=250&page=1&sparkline=false', {
            headers: {
                'Accept': 'application/json',
            }
        })
        .then(response => {
            setCoins(response.data);
        })
        .catch(error => console.log(error));
    };

    useEffect(() => {
        fetchCoinMarkets();
    }, []);

    return (
        <React.Fragment>
            <Box>
                <Box sx={{ mt: 3 }}>
                    <Card>
                        <CardContent>
                            <Box sx={{ maxWidth: 800 }}>
                                <TextField
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <SvgIcon fontSize='small' color='action'>
                                                    <SearchIcon />
                                                </SvgIcon>
                                            </InputAdornment>
                                        )
                                    }}
                                    placeholder='cryptocurrency search...'
                                    variant='outlined'
                                    onChange={handleChange}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
            <Box sx={{ pt: 3 }}>
                <Card>
                    <Box sx={{ minWidth: 1050, pb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ fontSize: 20, fontWeight: 'bold' }}>Cryptocurrency Ranking</TableCell>
                                    <TableCell align='right' sx={{ fontSize: 20, fontWeight: 'bold' }}>Price</TableCell>
                                    <TableCell align='right' sx={{ fontSize: 20, fontWeight: 'bold' }}>24h</TableCell>
                                    <TableCell align='right' sx={{ fontSize: 20, fontWeight: 'bold' }}>Volume</TableCell>
                                    <TableCell align='right' sx={{ fontSize: 20, fontWeight: 'bold' }}>Market Cap</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? filteredCoins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredCoins
                                ).map(coin => (
                                    <TableRow hover key={coin.id}>
                                        <TableCell component='th' scope='row' text-align= 'center' >
                                          <Box sx={{display: 'flex'}}>
                                          <img 
                                                src={coin.image} 
                                                alt='' 
                                                height='45'
                                                sx={{ mb:10 }}
                                            />
                                            </Box>
                                            <Box
                                            sx={{display: 'flex',
                                              flexDirection: 'column',
                                              pl:2,
                                              ml:-1.5,
                                            }}
                                            >
                                            <Typography
                                              variant='h6'
                                              style={{ textTransform: 'uppercase' }}
                                            >
                                              {coin.symbol}
                                            </Typography>
                                            <Typography
                                              variant='body1'
                                              style={{ color: 'darkgrey' }}
                                            >
                                               {coin.name}
                                            </Typography>  

                                          </Box>
              
                                        </TableCell>
                                        <TableCell align='right' sx={{ fontSize: 18 }}>${coin.current_price.toFixed(2)}</TableCell>
                                        <TableCell align='right' sx={{ fontSize: 18 }}>
                                            {coin.price_change_percentage_24h > 0 
                                                ? (
                                                    <span 
                                                        style={{ 
                                                            color: theme.palette.mode === 'dark' 
                                                                ? theme.palette.success.main 
                                                                : theme.palette.success.dark
                                                             
                                                        }}
                                                    >
                                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                                    </span>
                                                ) 
                                                : (
                                                    <span 
                                                        style={{ 
                                                            color: theme.palette.mode === 'dark' 
                                                                ? theme.palette.error.main 
                                                                : theme.palette.error.dark
                                                        }}
                                                    >
                                                        {coin.price_change_percentage_24h.toFixed(2)}%
                                                    </span>
                                                )
                                            }
                                        </TableCell>
                                        <TableCell align='right' sx={{ fontSize: 18 }}>${coin.total_volume.toLocaleString()}</TableCell>
                                        <TableCell align='right' sx={{ fontSize: 18 }}>${coin.market_cap.toLocaleString()}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 50]}
                            colSpan={3}
                            count={coins.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            sx={{ display:'flex', justifyContent: 'center' }}
                        />
                    </Box>
                </Card>
            </Box>
        </React.Fragment>
    );
};

export default CoinMarkets;
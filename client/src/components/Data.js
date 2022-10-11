import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import {Box} from '@mui/material';
// import { Pie } from "react-chartjs-2";
import {DataGrid, heIL } from '@mui/x-data-grid';
// import { DateRangePicker } from '@material-ui/pickers'
import moment from 'moment';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { zhCN } from '@mui/material/locale';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#1976d2' },
    },
  },
  zhCN,
);

const Data = () =>{
    const [transactions, setTransactions] = useState("");
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:4000/getData");
                setTransactions(response.data.data.transactions)

            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, []);
    

    const columns = useMemo(() => [
        {field:'transaction_id', headerName:"ID", width:80},
        {field:'transaction_date', headerName:"Date", width:200, type: 'date', renderCell: params => moment(params.row.transaction_date).format('HH:MM DD.MM.YYYY')},
        {field:'credit_amount', headerName:"Credit Amount", width:150, sortable: true, filterable: true, type: 'number'},
        {field:'debit_amount', headerName:"Debit Amount", width:150, type: 'number'},
        {field:'sender', headerName:"Sender", width:200},
        {field:'receiver', headerName:"Receiver", width:200}
    ], []);

    return (
        <ThemeProvider theme={theme}>
        <Box
        sx={{
            height:700,
            width:'60%',
            margin:"auto",
            textAlign: 'center', mt:3, mb:3,
        }}
        >

            {/* <DateRangePicker></DateRangePicker> */}
            <DataGrid
            columns={columns}
            rows={transactions}
            getRowId={row=>row.transaction_id}
            localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
        </ThemeProvider>
    );
};

export default Data;
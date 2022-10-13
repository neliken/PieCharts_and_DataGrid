import React, {useState, useEffect, useMemo} from "react";
import axios from 'axios';
import {Box} from '@mui/material';
import {DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { DatePicker } from "@mui/x-date-pickers"; 
import { TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const Data = (props) =>{
    const [transactions, setTransactions] = useState("");
    const [startDate, setStartDate] = useState(new Date('10/02/2021'));  
    const [endDate, setEndDate] = useState(new Date('10/01/2022'));  
    // console.log(startDate,  endDate);
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("http://localhost:4000/getData");
                const data = response.data.data.transactions;
                
                const filterdData = data.filter((transaction) => {
                    const data = new Date(transaction.transaction_date)
                    return data.getTime() >= startDate.getTime() && data.getTime() <= endDate.getTime();
                })

                setTransactions(filterdData);
                
            }catch(err){
                console.log(err);
            }
        }
        fetchData();
    }, [startDate, endDate]);
    
    

    const columns = useMemo(() => [
        {field:'transaction_id', headerName: props.t("ID"), width:80},
        {field:'transaction_date', headerName: props.t("Date"), width:200, type: 'date', renderCell: params => moment(params.row.transaction_date).format('HH:MM DD/MM/YYYY')},
        {field:'credit_amount', headerName: props.t("Credit Amount"), width:170, sortable: true, filterable: true, type: 'number'},
        {field:'debit_amount', headerName: props.t("Debit Amount"), width:170, type: 'number'},
        {field:'sender', headerName: props.t("Sender"), width:230},
        {field:'receiver', headerName: props.t("Receiver"), width:230}
    ], [props]);

    return (
        <Box
        sx={{
            height:700,
            width:'60%',
            margin:"auto",
            // textAlign: 'center',
            mt:3, mb:3,
        }}
        >

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker 
            label={props.t('From')}
            minDate='10/02/2021'
            maxDate='10/01/2022'
            value={startDate} 
            // onChange={(newDate) => setStartDate(moment(newDate).format("MM/DD/YYYY"))} 
            onChange={(newDate) => setStartDate(newDate)} 
            renderInput={(params) => (
                <TextField {...params} />
            )}>
            </DatePicker>
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker 
            label={props.t('To')}
            maxDate='10/01/2022'
            value={endDate} 
            onChange={(newDate) => setEndDate(newDate)} 
            renderInput={(params) => (
                <TextField {...params} />
            )}>
            </DatePicker>
        </LocalizationProvider>
        
            <DataGrid
            columns={columns}
            rows={transactions}
            getRowId={row=>row.transaction_id}
            // localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
            />
        </Box>
    );
};

export default Data;
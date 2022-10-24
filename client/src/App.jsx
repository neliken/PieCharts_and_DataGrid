import React from 'react';
import Data from './components/Data';
import PieChart from './components/PieChart';
import { Box } from '@mui/material';
import { useTheme,  ThemeProvider } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n/i18n";

const App = () => {
    const { t, i18n } = useTranslation();
    var theme = useTheme();
    document.body.dir = i18n.dir();

    const changeLanguage = (lng) => { 
      i18n.changeLanguage(lng)
      document.body.dir = i18n.dir();
      theme.direction = i18n.dir();
    }

    return (
    <ThemeProvider theme={theme}>
        <Box>
            <button onClick={() => changeLanguage('en')}>En</button>
            <button onClick={() => changeLanguage('he')}>He</button>
    
            <PieChart t={t}></PieChart>
            <Data t={t}></Data>
        </Box>
    </ThemeProvider>
    );
};

export default App;
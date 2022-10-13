import React from 'react';
import Data from './components/Data';
import PieChart from './components/PieChart';
import { Box } from '@mui/material';
import { useTheme,  ThemeProvider , createTheme} from '@mui/material/styles';
import { heIL } from '@mui/material/locale';
import { useTranslation } from 'react-i18next';
import i18n from "./i18n/i18n";

// const themee = createTheme(
//     {
//       palette: {
//         primary: { main: '#1976d2' },
//       },
//       direction: 'rtl',
//     },
//     heIL
//   );

const App = () => {
    const { t, i18n } = useTranslation();
    var theme = useTheme();
    document.body.dir = i18n.dir();

    const changeLanguage = (lng) => { 
      i18n.changeLanguage(lng)
      document.body.dir = i18n.dir();
      theme.direction = i18n.dir();
      theme =  heIL;
    }

    return (
    <ThemeProvider theme={theme}>
        <Box>
            <button onClick={() => changeLanguage('en')}>en</button>
            <button onClick={() => changeLanguage('he')}>he</button>
    
            <PieChart t={t}></PieChart>
            <Data t={t}></Data>
        </Box>
    </ThemeProvider>
    );
};

export default App;
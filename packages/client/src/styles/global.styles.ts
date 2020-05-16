import { makeStyles } from '@material-ui/core/styles';

// import library styles
import 'normalize.css';

export const useGlobalStyles = makeStyles({
  '@global': {
    body: {
      fontFamily: "'Roboto', sans-serif",
    },

    'html, body, #root': {
      height: '100%',
    },

    '#root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'stretch',
      alignItems: 'center',
    },

    a: {
      textDecoration: 'none',

      '&:hover': {
        textDecoration: 'underline',
      },
    },
  },
});

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  bold: {
    fontWeight: 'bold'
  },
  flex: {
    flex: 1
  },
  container: {
    marginTop: 10
  },
  root: {
    height: 700,
    width: 800,
    margin: `20px auto`
  },
  button: {
    width: 200,
    '&:last-child': {
      marginTop: 10
    }
  }
}));

export default useStyles;

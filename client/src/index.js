import React, { useState, Fragment } from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Alert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  button: {
    marginTop: theme.spacing(4),
    backgroundColor: '#6CC4DE',
    color: '#FFFFFF',
  },
}));

const App = () => {
  const classes = useStyles();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [value, setValue] = useState('');

  const handleChange = (event) => setValue(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch(`${process.env.API_URL}/url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: value }),
      });
      setSuccess(true);
      setError(false);
    } catch (e) {
      setError(true);
      setSuccess(false);
    }
  };

  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
          Heroku Heartbeat
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Heartbeat pings your Heroku app every 25 minutes so it will never go to sleep.
        </Typography>
      </Container>
      <Container maxWidth="md" component="main">
        <Grid container justify="center">
          <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
              <TextField
                placeholder="https://my-app.herokuapp.com"
                variant="outlined"
                value={value}
                onChange={handleChange}
                fullWidth
              />
              <Grid container justify="center">
                <Grid item xs={12} sm={10} md={8} lg={6} xl={4}>
                  <Button
                    className={classes.button}
                    variant="contained"
                    type="submit"
                    fullWidth
                  >
                    Ping Forever
                  </Button>
                </Grid>
              </Grid>
              <Box mt={3}>
                {success && <Alert severity="success">Success! Your app will never sleep again</Alert>}
                {error && <Alert severity="error">Error! There was a problem with the request</Alert>}
              </Box>
            </form>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

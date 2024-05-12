import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import useEmail from '../hooks/fetchEmail';

function Hero() {
  const emailStorage = useEmail();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleEmailChange = (event) => {
    emailStorage.set(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailStorage.submit();
  };

  const handleGoToHome = () => {
    navigate('/home');
  };

  return (
    <Box
      component="form"
      id="hero"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '10px',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          aspectRatio: '1/1',
          borderRadius: '16px',
          boxShadow: 3,
          backgroundColor: '#c0c0c0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: '100%' }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
            Navigate the&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
              Universe
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.secondary"
            sx={{ width: '100%' }}
          >
            Dive into a universe of information with this interactive web. 
            Seamlessly interact with NASA's open data, 
            unlocking a treasure trove of space exploration wonders.
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            useFlexGap
            alignItems="center"
            justifyContent="center"
            sx={{ pt: 2, width: '100%' }}
            onSubmit={handleSubmit}
          >
            <TextField
              id="outlined-basic"
              hiddenLabel
              size="small"
              variant="outlined"
              aria-label="Enter your email address"
              placeholder="Your Name"
              inputProps={{
                autoComplete: 'off',
                'aria-label': 'Enter your email address',
              }}
              onChange={handleEmailChange}
              value={emailStorage.get || ''}
            />
            <Button variant="contained" color="primary" type="submit">
              Let the adventure begin
            </Button>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGoToHome}
          >
            Go to Home
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

export default Hero;

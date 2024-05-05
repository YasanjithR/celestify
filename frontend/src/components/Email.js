import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import useEmail from '../hooks/fetchEmail';

export default function Hero() {
  const emailStorage = useEmail();


  const handleEmailChange = (event) => {
    emailStorage.set(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    emailStorage.submit();
  };

  return (
    <Box component="form" onSubmit={handleSubmit}
      id="hero"
      sx={(theme) => ({
        width: '100%',
       
      })}
    >
      <Container
        sx={{
            pt: { xs: 2, sm: 6 },
            pb: { xs: 4, sm: 8 },
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: { xs: 3, sm: 6 },
            borderRadius: 8,
            boxShadow: 3,
            margin: "20px auto",
            backgroundColor: "#c0c0c0",
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignSelf: 'center',
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
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            Dive into a universe of information with this interactive web. 
            Seamlessly interact with NASA's open data, 
            unlocking a treasure trove of space exploration wonders.
          </Typography>
          {emailStorage.submitted && emailStorage.get ? (
            <Typography
              textAlign="center"
              color="text.secondary"
              sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
            >
              You're already registered to the service an the email
            </Typography>
          ) : (
            <>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignSelf="center"
                spacing={1}
                useFlexGap
                sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
                onSubmit={handleSubmit}
              >
                <TextField
                  id="outlined-basic"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  aria-label="Enter your email address"
                  placeholder="Your email address"
                  inputProps={{
                    autoComplete: 'off',
                    'aria-label': 'Enter your email address',
                  }}
                  onChange={handleEmailChange}
                  value={emailStorage.get || ''}
                />
                <Button variant="contained" color="primary" type="submit">
                  Start now
                </Button>
              </Stack>
              <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
                By clicking &quot;Start now&quot; you agree to our&nbsp;
                <Link href="#" color="primary">
                  Terms & Conditions
                </Link>
                .
              </Typography>
            </>
          )}
        </Stack>
      
      </Container>
    </Box>
  );
}

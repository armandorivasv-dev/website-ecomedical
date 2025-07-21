'use client';
import { Container, Typography, Stack, Button, useMediaQuery } from '@mui/material';
import Grid from '@mui/material/Grid';
import { green } from '@/styles/getCustomTheme';
import HeadsetIcon from '@mui/icons-material/Headset';
import Link from 'next/link';

export const Contacts = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Container
      id='services'
      maxWidth='xxl'
      sx={{ backgroundColor: 'primary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid container>
          <Grid
            size={{ xs: 12, md: 6 }}
            container
            direction={'column'}
          >
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              sx={{ pt: 1 }}
              color={green[300]}
              textAlign='left'
            >
              CallCenter
            </Typography>
            <Link
              href='https://wa.me/56977013227'
              passHref
              target='_blank'
              style={{ textDecoration: 'none' }}
            >
              <Stack
                direction='row'
                spacing={1}
                sx={{
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginTop: 1,
                }}
              >
                <HeadsetIcon
                  color='primary'
                  sx={{
                    color: 'primary.main ',
                    borderRadius: 10,
                    border: 'solid',
                    borderColor: 'primary.main',
                    padding: 1,
                    marginRight: 2,
                    backgroundColor: green[300],
                    fontSize: { xs: 50, md: 60 },
                  }}
                />
                <Typography
                  variant={isMobile ? 'h4' : 'h2'}
                  color='white'
                  maxWidth={600}
                  textAlign='left'
                >
                  +56 9 7701 3227
                </Typography>
              </Stack>
            </Link>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Typography
              variant={isMobile ? 'h5' : 'h4'}
              color={green[300]}
              textAlign='left'
            >
              Cobertura
            </Typography>
            <Typography
              variant={isMobile ? 'h4' : 'h2'}
              color='white'
              maxWidth={600}
              textAlign='left'
              marginTop={1}
            >
              REGIÓN METROPOLITANA <br /> 5ta REGIÓN
            </Typography>
          </Grid>
        </Grid>
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ pt: 4 }}
        >
          <Button
            variant='outlined'
            sx={{ borderColor: 'white', color: 'white' }}
            size='large'
            href='https://wa.me/56977013227'
            target='_blank'
          >
            AGENDA UNA CITA
          </Button>
        </Stack>
      </Container>
    </Container>
  );
};

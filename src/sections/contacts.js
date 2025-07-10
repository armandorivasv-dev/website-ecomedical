import { Container, Typography, Stack, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { green } from '@/styles/get-custom-theme';
import HeadsetIcon from '@mui/icons-material/Headset';
import Link from 'next/link';

export const Contacts = () => {
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
              variant='h5'
              sx={(theme) => ({ pt: 1, [theme.breakpoints.up('md')]: { ...theme.typography.h4 } })}
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
                    //fontSize: mdUp ? 60 : 50,
                    fontSize: { xs: 50, md: 60 },
                  }}
                />
                <Typography
                  variant='h4'
                  sx={(theme) => ({ [theme.breakpoints.up('md')]: { ...theme.typography.h2 } })}
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
              variant='h5'
              sx={(theme) => ({ [theme.breakpoints.up('md')]: { ...theme.typography.h4 } })}
              color={green[300]}
              textAlign='left'
            >
              Cobertura
            </Typography>
            <Typography
              variant='h4'
              sx={(theme) => ({ [theme.breakpoints.up('md')]: { ...theme.typography.h2 } })}
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

'use client';
import { Container, Typography, CardContent, Card, Stack, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { green } from '@/styles/getCustomTheme';

const cardData = [
  {
    id: '01',
    title: 'Agenda tu consulta medica a domicilio',
    backgroundColorDesktop: green[100],
    backgroundColorMobile: green[100],
  },
  {
    id: '02',
    title: 'Consulte nuestros medicos',
    backgroundColorDesktop: green[800],
    backgroundColorMobile: green[800],
  },
  {
    id: '03',
    title: 'Evaluación medica completa',
    backgroundColorDesktop: green[800],
    backgroundColorMobile: green[100],
  },
  {
    id: '04',
    title: 'Reciba su diagnostico detallado',
    backgroundColorDesktop: green[400],
    backgroundColorMobile: green[800],
  },
];

export const Steps = () => {
  return (
    <Container
      id='steps'
      maxWidth='xxl'
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid container>
          <Grid
            size={{ xs: 12, md: 12 }}
            container
            direction={'column'}
          >
            <Stack
              direction='row'
              spacing={1}
              sx={{
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}
            >
              <LocalHospitalIcon color='primary' />
              <Typography
                variant='h6'
                color='primary.main'
                maxWidth={600}
                textAlign='left'
              >
                PASOS A SEGUIR
              </Typography>
            </Stack>
            <Typography
              variant={{ xs: 'h4', md: 'h3' }}
              sx={{ pt: 1 }}
              maxWidth={500}
            >
              Atención médica confiable enfocada en su bienestar
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 12 }}
            container
            marginTop={4}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 6 }}
              >
                <Card
                  sx={{
                    minWidth: 275,
                    borderRadius: 2,
                    backgroundColor: {
                      xs: item.backgroundColorMobile,
                      md: item.backgroundColorDesktop,
                    },
                    py: 8,
                  }}
                >
                  <CardContent>
                    <Stack
                      direction={'row'}
                      spacing={2}
                      alignItems='center'
                    >
                      <Typography
                        variant='h5'
                        fontWeight={600}
                        color='white'
                        sx={{
                          borderRadius: 10,
                          border: 'solid',
                          borderColor: 'primary.main',
                          padding: 1,
                          marginRight: 2,
                          backgroundColor: 'primary.main',
                        }}
                      >
                        {item.id}
                      </Typography>
                      <Typography variant='h5'>{item.title}</Typography>

                      <Typography
                        variant='body2'
                        marginTop={2}
                      >
                        {item.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'center'}
          sx={{ pt: 4 }}
        >
          <Button
            variant='contained'
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

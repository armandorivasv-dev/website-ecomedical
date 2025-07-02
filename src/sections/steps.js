import { Container, Typography, CardContent, Card, useMediaQuery, Stack, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { green } from '@/styles/get-custom-theme';

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
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='services'
      maxWidth='xxl'
      //sx={{ backgroundColor: 'secondary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid container>
          <Grid
            // xs={12}
            // md={12}
            size={{ xs: 12, md: 12 }}
            container
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
            >
              <LocalHospitalIcon
                color='primary'
                sx={{ color: 'white' }}
              />
              <Typography
                variant='h6'
                color='white'
                maxWidth={600}
                textAlign='left'
              >
                NUESTROS SERVICIOS
              </Typography>
            </Stack>
            <Typography
              variant={mdUp ? 'h3' : 'h4'}
              textAlign='center'
              color='white'
            >
              Soluciones integrales de atención médica
            </Typography>
          </Grid>

          <Grid
            // xs={12}
            // md={12}
            size={{ xs: 12, md: 12 }}
            container
            //spacing={4}
            marginTop={4}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                // xs={12}
                // md={6}
                size={{ xs: 12, md: 6 }}
              >
                <Card
                  sx={{
                    minWidth: 275,
                    borderRadius: 2,
                    backgroundColor: mdUp ? item.backgroundColorDesktop : item.backgroundColorMobile,
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
      </Container>
      <Stack
        direction='row'
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ pt: 2 }}
      >
        <Button
          variant='contained'
          //color='primary'
          size='large'
          //onClick={handleOpenContactForm}
        >
          AGENDA UNA CITA
        </Button>
      </Stack>
    </Container>
  );
};

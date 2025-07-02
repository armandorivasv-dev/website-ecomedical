import { Container, Typography, CardContent, Card, useMediaQuery, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const cardData = [
  {
    id: '01.',
    title: 'Ecotomografía general',
    description:
      'Estudio de órganos internos y tejidos blandos mediante ultrasonido, para diagnósticos precisos a domicilio.',
  },
  {
    id: '02.',
    title: 'Ecotomografía músculo esquelética',
    description: 'Evaluación de músculos, tendones y articulaciones por ultrasonido, identificando lesiones en casa.',
  },
  {
    id: '03.',
    title: 'Ecotomografía Doppler colo',
    description:
      'Visualización del flujo sanguíneo con ultrasonido y color, detectando anomalías vasculares a domicilio. ',
  },
  {
    id: '04.',
    title: 'Ecocardiograma',
    description: 'Análisis del corazón por ultrasonido, evaluando su estructura y función en la comodidad del hogar. ',
  },
  {
    id: '05.',
    title: 'Electrocardiograma',
    description: 'Registro de la actividad eléctrica del corazón, detectando arritmias y problemas cardíacos en casa. ',
  },
  {
    id: '06.',
    title: 'Holters cardiacos',
    description:
      'Monitoreo prolongado del ritmo cardíaco durante 24 horas o más, identificando irregularidades a domicilio. ',
  },
  {
    id: '07.',
    title: 'Holters de presión',
    description:
      'Registro continuo de la presión arterial por 24 horas, útil para diagnósticos de hipertensión en casa. ',
  },
  {
    id: '08.',
    title: 'Rayos x',
    description:
      'Obtención de imágenes internas del cuerpo mediante radiación ionizante, para diagnósticos óseos y pulmonares a domicilio. ',
  },
  {
    id: '09.',
    title: 'Laboratorio',
    description:
      'Toma de muestras sanguíneas y de otros fluidos para análisis clínicos, con resultados entregados en casa. ',
  },
  {
    id: '10.',
    title: ' Medicina general',
    description:
      'Monitoreo prolongado del ritmo cardíaco durante 24 horas o más, identificando irregularidades a domicilio. ',
  },
];

export const Services = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='services'
      maxWidth='xxl'
      sx={{ backgroundColor: 'secondary.main' }}
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
            spacing={4}
            marginTop={4}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                // xs={12}
                // md={6}
                size={{ xs: 12, md: 6 }}
              >
                <Card sx={{ minWidth: 275, borderRadius: 6 }}>
                  <CardContent>
                    <Typography
                      variant='h5'
                      fontWeight={600}
                      color='primary'
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

'use client';
import { Container, Typography, CardContent, Card, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { green } from '@/styles/getCustomTheme';

const cardData = [
  {
    id: '01.',
    title: 'Ecotomografía general',
    description:
      'Estudio abdominal, tiroideo, pelviana femenina y masculina, renal, cuello, inguinales, testiculares, pared abdominal, y partes blandas.',
  },
  {
    id: '02.',
    title: 'Ecotomografía músculo esquelética',
    description:
      'Evaluación de muñeca, mano, tobillo, pie, codo, rodilla, hombro, caderas, muslo, pierna, brazo, y antebrazo.',
  },
  {
    id: '03.',
    title: 'Ecotomografía Doppler color',
    description:
      'Doppler arterial y venoso de miembros inferiores y superiores, Doppler carotideo y vertebral, Doppler testicular, Doppler descarte de TVP. Doppler partes blandas.',
  },
  {
    id: '04.',
    title: 'Ecocardiograma',
    description: 'Análisis del corazón por ultrasonido, evaluando su estructura y función en la comodidad del hogar.',
  },
  {
    id: '05.',
    title: 'Electrocardiograma',
    description: 'Registro de la actividad eléctrica del corazón, detectando arritmias y problemas cardíacos en casa.',
  },
  {
    id: '06.',
    title: 'Holters cardiacos',
    description:
      'Monitoreo prolongado del ritmo cardíaco durante 24 horas o más, identificando irregularidades a domicilio.',
  },
  {
    id: '07.',
    title: 'Holters de presión',
    description:
      'Registro continuo de la presión arterial por 24 horas, útil para diagnósticos de hipertensión en casa.',
  },
  {
    id: '08.',
    title: 'Rayos x',
    description: 'Radiologia general, tórax, cráneo, y en general.',
  },
  {
    id: '09.',
    title: 'Laboratorio',
    description: 'Toma de muestras con resultados entregados en casa.',
  },
  {
    id: '10.',
    title: ' Medicina general',
    description:
      'Monitoreo prolongado del ritmo cardíaco durante 24 horas o más, identificando irregularidades a domicilio.',
  },
];

export const Services = () => {
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
                sx={{ color: green[300] }}
              />
              <Typography
                variant='h6'
                color={green[300]}
                maxWidth={600}
                textAlign='left'
              >
                NUESTROS SERVICIOS
              </Typography>
            </Stack>
            <Typography
              variant={{ xs: 'h4', md: 'h3' }}
              textAlign='center'
              color='white'
            >
              Soluciones integrales de atención médica
            </Typography>
          </Grid>

          <Grid
            size={{ xs: 12, md: 12 }}
            container
            spacing={4}
            marginTop={4}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 6 }}
              >
                <Card sx={{ minWidth: 275, minHeight: 160, borderRadius: 6 }}>
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

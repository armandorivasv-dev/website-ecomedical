import { Container, Typography, CardContent, Card, useMediaQuery, Stack, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { green } from '@/styles/get-custom-theme';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const cardData = [
  {
    id: '01.',
    title: 'Doctores Expertos',
    description: 'Profesionales cualificados que ofrecen atención de máxima calidad. ',
    icon: '/assets/icons/ecomedical-medicos-icon.png',
  },
  {
    id: '02.',
    title: 'Atención de emergencia',
    description: 'Tratamiento rápido y confiable cuando más lo necesitas.',
    icon: '/assets/icons/ecomedical-emergencia-icon.png',
  },
  {
    id: '03.',
    title: 'Soporte completo 24/7',
    description: 'Siempre aquí para citas y emergencias.',
    icon: '/assets/icons/ecomedical-soporte-icon.png',
  },
];

export const AboutUs = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='features'
      maxWidth='xxl'
      //sx={{ backgroundColor: 'secondary.main' }}
    >
      <Container
        maxWidth='lg'
        sx={{ py: 10 }}
      >
        <Grid
          container
          spacing={4}
        >
          <Grid size={{ xs: 12, md: 6 }}>
            <Image
              src='/assets/images/ecomedical-nosotros.png'
              alt='ecomedical about us'
              width={500}
              height={600}
              style={{ width: '100%', height: 'auto' }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 6 }}
            sx={{ py: 6 }}
            //container
            //alignItems={'stretch'}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
              //sx={{ pt: mdUp ? '30vh' : '25vh' }}
            >
              <LocalHospitalIcon
                color='primary'
                sx={{ color: 'primary.main' }}
              />
              <Typography
                variant='h6'
                color='primary.main'
                maxWidth={600}
                textAlign='left'
              >
                NOSOTROS
              </Typography>
            </Stack>
            <Typography variant={mdUp ? 'h3' : 'h4'}>
              EcoMedical crea un entorno seguro, tu salud es nuestra prioridad
            </Typography>
            <Typography variant='subtitle2'>
              Ecomedical se ha convertido en una solución para todas aquellas personas que buscan atención médica, en la
              comodidad de su domicilio, o que tienen dificultades para llegar a los centros de atención medica.
            </Typography>

            <Stack
              direction='row'
              spacing={4}
              sx={{ pt: 2 }}
            >
              <Stack>
                <Image
                  src='/assets/icons/ecomedical-vision-icon.png'
                  alt='Nuestra Visión'
                  width={50}
                  height={50}
                />

                <Typography variant={mdUp ? 'h6' : 'h4'}>Nuestra Visión</Typography>

                <Typography
                  variant='subtitle2'
                  maxWidth={500}
                >
                  Ser un líder confiable en atención médica de calidad, accesible y compasiva.
                </Typography>
              </Stack>

              <Stack>
                <Image
                  src='/assets/icons/ecomedical-mision-icon.png'
                  alt='Nuestra Misión'
                  width={50}
                  height={50}
                />

                <Typography variant={mdUp ? 'h6' : 'h4'}>Nuestra Misión</Typography>

                <Typography
                  variant='subtitle2'
                  maxWidth={500}
                >
                  Ofrecer atención experta y centrada en el paciente con tecnología avanzada las 24 horas del día, los 7
                  días de la semana y un enfoque en el bienestar.
                </Typography>
              </Stack>
            </Stack>

            <Button
              variant='contained'
              //color='primary'
              size='large'
              //onClick={handleOpenContactForm}
            >
              AGENDA UNA CITA
            </Button>
          </Grid>
          {/* <Grid size={{ xs: 4, md: 4 }}>
            <Image
              src='/assets/images/ecomedical-nosotros.png'
              alt='ecomedical about us'
              width={400}
              height={600}
              //style={{ objectFit: 'cover' }}
            />
          </Grid>
          <Grid
            size={{ xs: 8, md: 4 }}
            marginTop={mdUp ? 0 : 2}
          >
            <Typography variant='subtitle1'>NOSOTROS</Typography>
            <Typography variant='subtitle1'>
              EcoMedical crea un entorno seguro, tu salud es nuestra prioridad
            </Typography>
          </Grid> */}
        </Grid>
      </Container>
    </Container>
  );
};

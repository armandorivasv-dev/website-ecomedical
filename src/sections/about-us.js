import { Container, Typography, Stack, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const AboutUs = () => {
  return (
    <Container
      id='about-us'
      maxWidth='xxl'
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
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            //paddingY={10}
            sx={{ py: { xs: 0, md: 10 } }}
          >
            <Stack
              direction='row'
              alignItems='center'
              spacing={1}
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
            <Typography
              variant='h4'
              sx={(theme) => ({ pt: 1, [theme.breakpoints.up('md')]: { ...theme.typography.h3 } })}
            >
              EcoMedical crea un entorno seguro, tu salud es nuestra prioridad
            </Typography>
            <Typography
              variant='subtitle2'
              sx={{ pt: 2 }}
            >
              Ecomedical se ha convertido en una solución para todas aquellas personas que buscan atención médica, en la
              comodidad de su domicilio, o que tienen dificultades para llegar a los centros de atención medica.
            </Typography>

            <Stack
              direction='row'
              spacing={4}
              sx={{ pt: 4 }}
            >
              <Stack>
                <Image
                  src='/assets/icons/ecomedical-vision-icon.png'
                  alt='Nuestra Visión'
                  width={50}
                  height={50}
                />

                <Typography
                  variant='h4'
                  sx={(theme) => ({ pt: 1, [theme.breakpoints.up('md')]: { ...theme.typography.h6 } })}
                >
                  Nuestra Visión
                </Typography>

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

                <Typography
                  variant='h4'
                  sx={(theme) => ({ pt: 1, [theme.breakpoints.up('md')]: { ...theme.typography.h6 } })}
                >
                  Nuestra Misión
                </Typography>

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
              size='large'
              sx={{
                mt: 6,
              }}
              href='https://wa.me/56977013227'
              target='_blank'
            >
              AGENDA UNA CITA
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Container>
  );
};

import { Container, Typography, CardContent, Card, useMediaQuery, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { green } from '@/styles/get-custom-theme';

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

export const Features = () => {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      id='features'
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
            spacing={4}
            marginTop={mdUp ? 0 : 2}
          >
            {cardData.map((item, index) => (
              <Grid
                key={index}
                size={{ xs: 12, md: 4 }}
              >
                <Card sx={{ minWidth: 275, minHeight: 160, py: 3, borderRadius: 6, backgroundColor: green[100] }}>
                  <CardContent>
                    <Stack
                      direction={'row'}
                      spacing={2}
                    >
                      {/* <Typography
                        variant='h5'
                        fontWeight={600}
                        color='primary.main'
                      >
                        {item.id}
                      </Typography> */}
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <Stack
                        direction={'column'}
                        //spacing={2}
                      >
                        <Typography variant='h5'>{item.title}</Typography>
                        <Typography
                          variant='body2'
                          //marginTop={2}
                        >
                          {item.description}
                        </Typography>
                      </Stack>
                    </Stack>
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

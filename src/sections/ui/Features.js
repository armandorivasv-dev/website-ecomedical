'use client';
import { Container, Typography, CardContent, Card, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { green } from '@/styles/getCustomTheme';

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
    title: 'Soporte integral',
    description: 'Siempre aquí para citas y emergencias.',
    icon: '/assets/icons/ecomedical-soporte-icon.png',
  },
];

export const Features = () => {
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
            sx={{ marginTop: { xs: 2, md: 0 } }}
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
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={50}
                        height={50}
                      />
                      <Stack direction={'column'}>
                        <Typography variant='h5'>{item.title}</Typography>
                        <Typography variant='body2'>{item.description}</Typography>
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

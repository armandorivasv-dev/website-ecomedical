import { Box, Container, IconButton, Link, Stack, Typography, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { Instagram } from '@mui/icons-material';

function Copyright() {
  return (
    <Typography
      textAlign='center'
      variant='body2'
      color='text.secondary'
      mt={1}
    >
      {'Copyright © '}
      ecomedical {new Date().getFullYear()}
    </Typography>
  );
}

function DevelopedBy() {
  return (
    <Typography
      textAlign='center'
      variant='body2'
      color='text.secondary'
      mt={1}
    >
      {'Developed by '}
      <Link
        href='https://www.armandorivasv.dev/'
        target='_blank'
      >
        @armandorivasv.dev&nbsp;
      </Link>
    </Typography>
  );
}

export default function Footer() {
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 4, md: 8 },
        py: { xs: 8, md: 10 },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 8 },
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,

            minWidth: { xs: '100%', md: '20%' },
          }}
        >
          <Box sx={{ width: { xs: '100%', md: '60%' } }}>
            <Box sx={{ ml: '0px' }}>
              <Image
                src='/assets/logos/ecomedical-logo.png'
                width={286 * 0.8}
                height={63 * 0.8}
                alt='ecomedical atención medica a domicilio'
                priority={true}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', md: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Dirección
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            Presidente Ríos 58
          </Typography>
          <Typography
            variant='subtitle1'
            fontWeight={400}
          >
            Santiago
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Contactos
          </Typography>
          <Link
            color='text.secondary'
            href='mailto:ecomedical.cl@gmail.com'
          >
            ecomedical.cl@gmail.com
          </Link>
        </Box>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex' },
            flexDirection: 'column',
            gap: 1,
          }}
        >
          <Typography
            variant='subtitle1'
            fontWeight={600}
          >
            Redes Sociales
          </Typography>
          <Stack
            direction='row'
            justifyContent={mdUp ? 'left' : 'center'}
            spacing={1}
            useFlexGap
            sx={{
              color: 'text.secondary',
            }}
          >
            <IconButton
              href='https://www.instagram.com/ecomedical.cl/'
              target='_blank'
              aria-label='Instagram'
              sx={{ alignSelf: 'center', color: 'primary.main' }}
            >
              <Instagram />
            </IconButton>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pt: { xs: 4, sm: 2 },
          width: '100%',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <div>
          <Copyright />
          <DevelopedBy />
        </div>
      </Box>
    </Container>
  );
}

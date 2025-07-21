'use client';
import PropTypes from 'prop-types';
import { Footer } from '@/components/UI/Footer';
import { TopNav } from '@/components/UI/TopNav';
import { InfoBotWidget } from '@/components/InfoBot/InfoBotWidget';
import { WhatsappWidget } from '@/components/WhatsappWidget';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import getCustomTheme from '@/styles/getCustomTheme';

const theme = createTheme(getCustomTheme('light'));

const ClientProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <TopNav />
      <main>{children}</main>
      <InfoBotWidget />
      <WhatsappWidget />
      <Footer />
    </ThemeProvider>
  );
};

ClientProviders.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ClientProviders;

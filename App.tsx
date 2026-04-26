import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { AppRoutes } from './src/routes/app.routes';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <AppRoutes />
    </ThemeProvider>
  );
}
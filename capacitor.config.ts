import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.shishikokoro.zpprexurqzixebfuneni',
  appName: 'Shi Shi Kokoro Property Management',
  webDir: 'dist',
  server: {
    url: 'https://zpprexurqzixebfuneni.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  ios: {
    scheme: 'Shi Shi Kokoro'
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'key0',
    }
  }
};

export default config;
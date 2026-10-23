import { Redirect } from 'expo-router';

// Auth dilewati sementara sesuai instruksi pengguna sampai ada callback
export default function Index() {
  return <Redirect href="/(tabs)/home" />;
}

import { useEffect } from 'react';
import { useRouter, Redirect } from 'expo-router';
import { View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to loading screen on app start
    const timer = setTimeout(() => {
      router.replace('/loading');
    }, 0);

    return () => clearTimeout(timer);
  }, [router]);

  return <View style={{ flex: 1 }} />;
}


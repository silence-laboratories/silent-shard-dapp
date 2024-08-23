import { useEffect, useState } from 'react';

import { loadLottieJson } from '@/utils/ui';

const useLottieAnimation = (jsonFileName: string) => {
  const [animationData, setAnimationData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    loadLottieJson(jsonFileName)
      .then((data: any) => setAnimationData(data))
      .catch((error: any) => console.error('Failed to load Lottie animation:', error))
      .finally(() => setLoading(false));
  }, [jsonFileName]);

  return { animationData, loading };
};

export default useLottieAnimation;

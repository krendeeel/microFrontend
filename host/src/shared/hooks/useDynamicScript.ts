import { useEffect, useState } from 'react';

export const useDynamicScript = (url: string): { ready: boolean; failed: boolean } => {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    script.src = url;
    script.type = 'text/javascript';
    script.async = true;

    setReady(false);
    setFailed(false);

    script.onload = (): void => {
      setReady(true);
    };

    script.onerror = (): void => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(script);

    return (): void => {
      document.head.removeChild(script);
    };
  }, [url]);

  return {
    ready,
    failed
  };
};

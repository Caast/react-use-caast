import { useEffect, useRef } from 'react';

type Caast = {
  infos(): void;
  canLoad(): void;
  reboot(triggerReadyEvent?: boolean): void;
  on(eventName: string, callback: any): void;
  off(eventName: string): void;
  setUser(data: any): void;
};

declare global {
  interface Window {
    caast: Caast;
  }
}

interface CaastOptions {
  APP_ID: string;
  APP_KEY: string;
  ENV: 'latest' | 'staging';
}

export default function useCaast<Caast>(props: CaastOptions): Caast | undefined {
  const { APP_ID, APP_KEY, ENV } = props;
  const caastInstance = useRef<any>();

  const onReady = () => {
    caastInstance.current = window.caast;
  };

  useEffect(() => {
    if (APP_ID && APP_KEY) {
      // @ts-ignore
      const isCaastLoaded = window.CaastInstance || document.getElementById('caast_library');
      if (!isCaastLoaded) {
        (function(c, a, A, s, t, J, S) {
          (c[t] = c[t]), (J = a.createElement(A)), (S = a.getElementsByTagName(A)[0]);
          J.async = 1;
          J.src = s;
          J.id = 'caast_library';
          console.log('J', J);
          console.log('S', S);
          S.parentNode.insertBefore(J, S);
        })(
          window,
          document,
          'script',
          'https://cdn.caast.tv/caast-' + ENV ? ENV : 'latest' + '/caast.js?APP_ID=' + APP_ID + '&APP_KEY=' + APP_KEY,
          'caast'
        );
        document.addEventListener('caast.onReady', onReady);
      } else {
        caastInstance.current = window.caast;
      }
      return () => document.removeEventListener('caast.onReady', onReady);
    } else {
      console.log('useCaast hook is missing APP_KEY or APP_ID');
    }
  });

  return caastInstance.current;
}

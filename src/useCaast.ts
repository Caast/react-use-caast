import { useEffect, useState } from 'react';

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
    CaastInstance: boolean;
  }
}

interface CaastOptions {
  app_id: string;
  app_key: string;
  env?: 'latest' | 'staging';
}

export default function useCaast(props: CaastOptions) {
  const { app_id, app_key, env } = props;
  const [caastInstance, setCaastInstance] = useState<Caast | undefined>(undefined);

  const insertScript = (url: string) => {
    const script = document.createElement('script');
    script.setAttribute('src', url);
    script.setAttribute('id', 'caast_library');
    script.setAttribute('async', 'true');
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (app_id && app_key) {
      const onLoaded = () => {
        setCaastInstance(window.caast);
      };
      const isCaastLoaded = window.CaastInstance || document.getElementById('caast_library');
      if (!caastInstance) {
        const URL = `https://cdn.caast.tv/caast-${env ? env : 'latest'}/caast.js?APP_ID=${app_id}&APP_KEY=${app_key}`;
        if (!isCaastLoaded) {
          insertScript(URL);
          document.addEventListener('caast.onLoaded', onLoaded);
        } else {
          setCaastInstance(window.caast);
        }
      }
      return () => {
        if (isCaastLoaded) {
          document.removeEventListener('caast.onLoaded', onLoaded);
        }
      };
    } else {
      console.error('useCaast hook is missing app_id or app_key');
    }
  }, []);

  return caastInstance;
}

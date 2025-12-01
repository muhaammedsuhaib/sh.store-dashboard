import { createContext, useEffect, useState, useContext, type ReactNode } from "react";

interface PWAContextType {
  deferredPrompt: any;
  isInstalled: boolean;
}

const PWAInstallContext = createContext<PWAContextType>({
  deferredPrompt: null,
  isInstalled: false,
});

export const PWAInstallProvider = ({ children }: { children: ReactNode }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone === true) {
      setIsInstalled(true);
    }
  }, []);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const installedHandler = () => setIsInstalled(true);
    window.addEventListener("appinstalled", installedHandler);
    return () => window.removeEventListener("appinstalled", installedHandler);
  }, []);

  return (
    <PWAInstallContext.Provider value={{ deferredPrompt, isInstalled }}>
      {children}
    </PWAInstallContext.Provider>
  );
};

export const usePWAInstall = () => useContext(PWAInstallContext);

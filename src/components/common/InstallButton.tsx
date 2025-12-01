import { usePWAInstall } from "../../context/PWAInstallContext";

export default function InstallButton() {
  const { deferredPrompt, isInstalled } = usePWAInstall();

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("Install choice:", result.outcome);
  };

  if (isInstalled || !deferredPrompt) return null;

  return (
    <button
      onClick={handleInstall}
      className="inline-flex items-center px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
    >
      Install App
    </button>
  );
}

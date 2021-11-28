import { useState, useEffect } from "react";
import { Camera } from "expo-camera";

export default function useCameraSettings(cameraRef) {
  const [settings, setSettings] = useState({});
  const [activeSettings, setActiveSettings] = useState({});

  const changeSettings = (title, value) => {
    const buf = Object.assign({}, activeSettings);
    buf[title] = value;
    setActiveSettings(buf);
  };

  useEffect(() => {
    (async () => {
      if (!activeSettings.Ratios) return;
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(
        activeSettings.Ratios
      );
      const buf = JSON.parse(JSON.stringify(settings));
      buf.Sizes = sizes;
      setSettings(buf);
    })();
  }, [activeSettings]);

  const cameraReady = () => {
    (async () => {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      const sizes = await cameraRef.current.getAvailablePictureSizesAsync(
        '16:9'
      );
      setSettings({
        'Flash Mode': Camera.Constants.FlashMode,
        'White Balance': Camera.Constants.WhiteBalance,
        Ratios: ratios,
        Sizes: sizes
      });

      setActiveSettings({
        'Flash Mode': 'auto',
        'White Balance': 'cloudy',
        Ratios: '16:9',
        Sizes: '1920x1080'
      });
    })();
  };

  return { settings, activeSettings, changeSettings, cameraReady };
}

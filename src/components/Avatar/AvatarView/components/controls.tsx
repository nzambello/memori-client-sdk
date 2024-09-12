import React, { useEffect, useRef, useState } from 'react';
import GUI from 'lil-gui';

interface BaseAction {
  weight: number;
  action?: string;
}

interface AdditiveAction {
  weight: number;
  action?: string;
}

export interface AnimationControlPanelProps {
  baseActions: Record<string, BaseAction>;
  additiveActions: Record<string, AdditiveAction>;
  onBaseActionChange: (action: string, oldAction: string) => void;
  onAdditiveActionChange?: (action: string, weight: number) => void;
  currentBaseAction: {
    action: string;
    weight: number;
    oldAction: string;
  };
}

const AnimationControlPanel: React.FC<AnimationControlPanelProps> = ({
  onBaseActionChange,
  onAdditiveActionChange,
  baseActions,
  additiveActions,
  currentBaseAction,
}) => {
  const guiRef = useRef<GUI | null>(null);
  const panelSettingsRef = useRef<Record<string, any>>({
    'modify time scale': 1.0,
  });
  const crossFadeControlsRef = useRef<any[]>([]);

  useEffect(() => {
    const gui = new GUI({ width: 310 });
    guiRef.current = gui;

    const folder1 = gui.addFolder('Base Actions');
    const folder2 = gui.addFolder('Additive Action Weights');
    const folder3 = gui.addFolder('General Speed');

    const baseNames = ['None', ...Object.keys(baseActions)];

    baseNames.forEach(name => {
      const settings = baseActions[name];
      panelSettingsRef.current[name] = () => {
        onBaseActionChange(name, currentBaseAction.action);
      };

      const control = folder1.add(panelSettingsRef.current, name);
      crossFadeControlsRef.current.push(control);
    });

    Object.entries(additiveActions).forEach(([name, settings]) => {
      panelSettingsRef.current[name] = settings.weight;
      folder2
        .add(panelSettingsRef.current, name, 0.0, 1.0, 0.01)
        .listen()
        .onChange((weight: number) => {
          if (settings.action) {
            // setWeight(settings.action, weight);
          }
          settings.weight = weight;
          onAdditiveActionChange?.(name, weight);
        });
    });

    folder3
      .add(panelSettingsRef.current, 'modify time scale', 0.0, 1.5, 0.01)
      // .onChange((value: number) => {
        // modifyTimeScale(value);
        // onTimeScaleChange(value);
      // });

    folder1.open();
    folder2.open();
    folder3.open();

    return () => {
      gui.destroy();
    };
  }, [
    onBaseActionChange,
    onAdditiveActionChange /*onTimeScaleChange, setWeight, prepareCrossFade, modifyTimeScale */,
  ]);

  return null; // This component doesn't render anything itself
};

export default AnimationControlPanel;

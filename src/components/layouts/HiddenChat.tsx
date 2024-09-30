import React, { useState, useMemo, useEffect } from 'react';
import Spin from '../ui/Spin';
import { LayoutProps } from '../MemoriWidget/MemoriWidget';
import { useTranslation } from 'react-i18next';
import QuestionHelp from '../icons/QuestionHelp';

const HiddenChatLayout: React.FC<LayoutProps> = ({
  Header,
  headerProps,
  Chat,
  chatProps,
  startPanelProps,
  sessionId,
  hasUserActivatedSpeak,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const initChat = () => {
    try {
      window.speechSynthesis.speak(
        new SpeechSynthesisUtterance('')
      );
    } catch (e) {
      console.error(e);
    }
    if (startPanelProps && startPanelProps?.initializeTTS)
      startPanelProps?.initializeTTS();
    if (startPanelProps && startPanelProps?.onClickStart)
      startPanelProps?.onClickStart();
  };

  useEffect(() => {
    const mainDiv = document.body;
    if (mainDiv) {
      if (isOpen) {
        console.log('open');
        mainDiv.style.width = 'calc(100% - 300px)';
        mainDiv.style.marginRight = '300px';
        mainDiv.style.transition = 'all 0.5s';
      } else {
        mainDiv.style.width = '100%';
        mainDiv.style.marginLeft = '0';
      }
    }
  }, [isOpen]);

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
    initChat();
  };

  return (
    <>
      <input
        type="checkbox"
        id="sidebar-toggle"
        className="sidebar-toggle"
        checked={isOpen}
        onChange={handleSidebarToggle}
      />
      <div className="sidebar-container">
        <label
          htmlFor="sidebar-toggle"
          className="sidebar-toggle-label open-label"
        >
          <QuestionHelp className="icon" />
        </label>
        <aside className="sidebar">
          <label
            htmlFor="sidebar-toggle"
            className="sidebar-toggle-label close-label"
          >
            <span>CLOSE</span>
          </label>
          <div className="sidebar-content">
            <div className="memori-totem-layout--header">
              {Header && headerProps && (
                <Header
                  position={{
                    latitude: 0,
                    longitude: 0,
                    placeName: '',
                  }}
                  {...headerProps}
                  className="memori-totem-layout-header--layout"
                />
              )}
            </div>
          </div>
          <div id="extension" />
          <div className="memori-totem-layout--controls">
            {sessionId && hasUserActivatedSpeak && Chat && chatProps ? (
              <Chat {...chatProps} />
            ) : (
              <div className="loading">
                <Spin />
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default HiddenChatLayout;
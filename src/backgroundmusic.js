import React, { useEffect } from 'react';

function BackgroundAudio() {
  useEffect(() => {
    const audio = new Audio('/path/to/audio-file.mp3');
    audio.loop = true;
    audio.play();

    return () => {
      audio.pause();
    };
  }, []);
}

export default BackgroundAudio;

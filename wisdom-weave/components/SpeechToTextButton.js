import React, { useState } from "react";

const styles = {
    accentedButton: `bg-black text-white py-2 px-4 rounded-full`,
}

const SpeechToTextButton = ({ onSpeechResult }) => {
  const [isListening, setIsListening] = useState(false);
  const recognition = new window.webkitSpeechRecognition(); // for Chrome

  recognition.lang = "en-US";

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onSpeechResult(transcript);
    setIsListening(false);
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    setIsListening(false);
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  };

  return (
    <button className={styles.accentedButton} onClick={toggleSpeechRecognition} disabled={isListening}>
      {isListening ? "Listening..." : "Speak"}
    </button>
  );
};

export default SpeechToTextButton;
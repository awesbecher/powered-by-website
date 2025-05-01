import { useState } from 'react';
import { initiateMercedesVapiCall, endMercedesVapiCall } from '../../services/vapi/mercedesDealer';
import styles from './MercedesDealer.module.css';

export default function MercedesDealer() {
  const [isCallActive, setIsCallActive] = useState(false);

  const handleStartCall = async () => {
    try {
      await initiateMercedesVapiCall();
      setIsCallActive(true);
    } catch (error) {
      console.error('Failed to start call:', error);
    }
  };

  const handleEndCall = async () => {
    try {
      await endMercedesVapiCall();
      setIsCallActive(false);
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Mercedes-Benz Dealership</h1>
      
      <div className={styles.card}>
        <h2 className={styles.header}>Welcome to Our Dealership</h2>
        <p>Experience luxury and performance with our latest Mercedes-Benz models.</p>
        
        <button
          onClick={isCallActive ? handleEndCall : handleStartCall}
          className={isCallActive ? styles.buttonEnd : styles.buttonStart}
        >
          {isCallActive ? 'End Call' : 'Start Call'}
        </button>
      </div>
    </div>
  );
}

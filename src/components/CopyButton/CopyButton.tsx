import React, {useState} from 'react';
import styles from './copyButton.module.css';
import clipboardCopy from 'clipboard-copy';

type TProps = {
    textToCopy: string;
}

const CopyButton:React.FC<TProps> = ({ textToCopy }) => {
    const [copied, setCopied] = useState(false);
  
    const handleCopy = () => {
      clipboardCopy(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    };
  
    return (
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>
    );
  };

  export default CopyButton;
import { createContext, useContext, useState, useEffect } from "react";
import CryptoJS from "crypto-js";
import encryptedData from "../data/encrypted_memories.json";

const SecurityContext = createContext();

export const SecurityProvider = ({ children }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedMemories, setDecryptedMemories] = useState([]);
  const [error, setError] = useState(false);

  const base64ToBlobUrl = (base64) => {
    try {
      const [prefix, content] = base64.split(",");
      if (!content) return null;

      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const mimeType = prefix.match(/:(.*?);/)[1];

      const blob = new Blob([byteArray], { type: mimeType });
      return URL.createObjectURL(blob);
    } catch (e) {
      console.error("Erro ao converter imagem", e);
      return null;
    }
  };

  const attemptUnlock = (password) => {
    try {
      const decodedList = [];

      encryptedData.forEach((cipherText) => {
        const bytes = CryptoJS.AES.decrypt(cipherText, password);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (!originalText) throw new Error("Senha errada");

        const memory = JSON.parse(originalText);

        memory.src = base64ToBlobUrl(memory.src);

        decodedList.push(memory);
      });

      setDecryptedMemories(decodedList);
      setIsUnlocked(true);
      setError(false);
      return true;
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
      console.error("Senha incorreta ou erro de parse.");
      setError(true);
      return false;
    }
  };

  // Limpeza de memória
  useEffect(() => {
    return () => {
      decryptedMemories.forEach((mem) => {
        if (mem.src) URL.revokeObjectURL(mem.src);
      });
    };
  }, [decryptedMemories]);

  return (
    <SecurityContext.Provider
      value={{ isUnlocked, attemptUnlock, decryptedMemories, error }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export const useSecurity = () => useContext(SecurityContext);

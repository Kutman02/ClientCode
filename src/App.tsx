import { useState, useEffect } from 'react';
import { CodeDisplay } from './components/CodeDisplay';
import { GenerateButton } from './components/GenerateButton';
import { CopyButton } from './components/CopyButton';
import { CodeHistory } from './components/CodeHistory';
import { generateCode } from './utils/generateCode';

function App() {
  // Инициализация состояний сразу из localStorage (один раз при создании)
  const [code, setCode] = useState(() => {
    try {
      return localStorage.getItem('currentCode') || '';
    } catch {
      return '';
    }
  });

  const [copied, setCopied] = useState(false);

  const [codeHistory, setCodeHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('codeHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // intentionally left blank
    }
    return [];
  });

  const [copiedHistory, setCopiedHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('copiedHistory');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // intentionally left blank
    }
    return [];
  });

  // Сохраняем данные в localStorage при изменениях
  useEffect(() => {
    localStorage.setItem('currentCode', code);
  }, [code]);

  useEffect(() => {
    localStorage.setItem('codeHistory', JSON.stringify(codeHistory));
  }, [codeHistory]);

  useEffect(() => {
    localStorage.setItem('copiedHistory', JSON.stringify(copiedHistory));
  }, [copiedHistory]);

  const handleGenerate = () => {
    const newCode = generateCode();
    setCode(newCode);
    setCopied(false);

    const updatedHistory = [newCode, ...codeHistory.filter((c) => c && c !== newCode)].slice(0, 3);
    setCodeHistory(updatedHistory);
  };

  const handleCopy = () => {
    if (!code) return;

    const message = `Ваш код получения: #${code}\nОн нужен, чтобы избежать путаницы и получить свой заказ быстро.`;

    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);

      setCopiedHistory((prev) => {
        const updated = [code, ...prev.filter((c) => c && c !== code)].slice(0, 3);
        return updated;
      });
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-6">
        <h1 className="text-lg sm:text-2xl font-bold text-center">
          🔒 Генератор кода подтверждения заказа в Яндекс доставка Яндекс Еда, Глово
        </h1>

        <CodeDisplay code={code} />
        <CodeHistory codes={copiedHistory} />

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <GenerateButton onGenerate={handleGenerate} />
          <CopyButton code={code} copied={copied} onCopy={handleCopy} />
        </div>

        <p className="text-xs sm:text-sm text-gray-400 text-center">
          Отправьте этот код клиенту в чат и попросите озвучить при получении.
        </p>
      </div>
    </div>
  );
}

export default App;

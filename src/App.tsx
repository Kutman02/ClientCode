import { useState } from 'react';
import { CodeDisplay } from './components/CodeDisplay';
import { GenerateButton } from './components/GenerateButton';
import { CopyButton } from './components/CopyButton';
import { generateCode } from './utils/generateCode';

function App() {
  const [code, setCode] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    setCode(generateCode());
    setCopied(false);
  };

  const handleCopy = () => {
    const message = `Ваш код получения: #${code}\nПожалуйста, озвучьте его при получении.`;
    navigator.clipboard.writeText(message).then(() => {
      setCopied(true);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-lg p-4 sm:p-8 flex flex-col items-center gap-6">
        <h1 className="text-lg sm:text-2xl font-bold text-center">
          🔒 Генератор кода подтверждения заказа в Яндекс доставка Яндекс Еда, Глово
        </h1>

        <CodeDisplay code={code} />

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

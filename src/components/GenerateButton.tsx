//# кнопка генерации кода
import React from 'react';

type Props = {
  onGenerate: () => void;
};

export const GenerateButton: React.FC<Props> = ({ onGenerate }) => {
  return (
    <button
      onClick={onGenerate}
      className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white">
      Сгенерировать
    </button>
  );
};

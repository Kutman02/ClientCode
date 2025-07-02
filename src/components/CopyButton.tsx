//# кнопка копирования кода
import React from 'react';

type Props = {
  code: string;
  copied: boolean;
  onCopy: () => void;
};

export const CopyButton: React.FC<Props> = ({ code, copied, onCopy }) => {
  return (
    <button
      onClick={onCopy}
      disabled={!code}
      className={`${
        code ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 cursor-not-allowed'
      } px-4 py-2 rounded text-white`}>
      {copied ? 'Скопировано' : 'Скопировать в буфер'}
    </button>
  );
};

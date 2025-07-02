//# отображает сгенерированный код
import React from 'react';

type Props = {
  code: string;
};

export const CodeDisplay: React.FC<Props> = ({ code }) => {
  return (
    <div className="text-6xl font-mono tracking-widest bg-yellow-200 text-black px-6 py-3 rounded shadow-xl">
      {code || '----'}
    </div>
  );
};

// components/CodeHistory.tsx

type CodeHistoryProps = {
  codes: string[];
};

export function CodeHistory({ codes }: CodeHistoryProps) {
  if (codes.length === 0) return null;

  return (
    <div className="w-full">
      <h2 className="text-sm text-gray-300 mb-2">🕓 Последние скопированные коды:</h2>
      <ul className="bg-gray-700 rounded-md p-2 text-sm space-y-1">
        {codes.map((code, index) => (
          <li key={index} className="text-gray-100">
            #{code}
          </li>
        ))}
      </ul>
    </div>
  );
}

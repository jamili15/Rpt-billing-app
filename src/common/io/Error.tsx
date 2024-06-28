type ErrorProps = {
  error?: string;
};

export const Error: React.FC<ErrorProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="text-[#b00020] text-sm text-center bg-[#f5f5dc] p-2 rounded border">
      {error}
    </div>
  );
};

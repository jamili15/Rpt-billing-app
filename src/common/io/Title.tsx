// components/Title.js

type TitleProps = {
  className?: string;
  children?: React.ReactNode;
};

const Title: React.FC<TitleProps> = ({ children, className }) => {
  return (
    <h1 className={`text-2xl font-bold text-gray-800 ${className}`}>
      {children}
    </h1>
  );
};

export default Title;

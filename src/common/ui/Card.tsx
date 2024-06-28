import { Error } from "@/common/io/Error";

interface CardProps {
  title: string;
  subTitleText: string;
  description?: string;
  error?: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  title,
  subTitleText,
  description,
  error,
  children,
}) => {
  return (
    <div className="bg-white w-[700px] py-5 flex items-center justify-center rounded-md shadow-md text-[16px]">
      <div className="p-10 w-full">
        <div className="flex flex-col gap-2 pb-2">
          <h1 className="capitalize text-[26.4px] font-bold ">{title}</h1>
          <h2 className="text-green-500 capitalize text-[20.4px] font-bold">
            {subTitleText}
          </h2>
          <Error error={error} />
          <p>{description}</p>
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </div>
  );
};

export default Card;

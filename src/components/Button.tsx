import React from "react";

interface ButtonProps {
  Title: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ Title, className, onClick }) => {
  return (
    <div>
      <button className={className} onClick={onClick} type='submit'>
        {Title}
      </button>
    </div>
  );
};

export default Button;

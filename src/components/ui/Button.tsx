import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger' | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties; // добавил style
}

const Button: React.FC<ButtonProps> = ({
                                         children,
                                         onClick,
                                         className,
                                         variant = 'primary',
                                         size = 'md',
                                         disabled = false,
                                         style,
                                         ...rest
                                       }) => {
  return (
      <button
          onClick={onClick}
          className={`btn btn-${variant} btn-${size} ${className || ''} ${disabled ? 'disabled' : ''}`}
          disabled={disabled}
          style={style} // передаем стиль в кнопку
          {...rest}
      >
        {children}
      </button>
  );
};

export default Button;

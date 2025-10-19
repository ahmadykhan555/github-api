import type React from 'react';

type BaseButtonProps = {
  text: string;
  classes?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  tooltipText?: string;
  disabled?: boolean;
  onClickHandler?: () => void;
};

export const BaseButton: React.FC<BaseButtonProps> = ({
  text,
  variant = 'primary',
  classes = '',
  tooltipText = '',
  disabled = false,
  onClickHandler,
}) => {
  const buttonClasses = (): string => {
    let classes = [
      'px-4 py-2 rounded-md text-xs md:text-sm disabled:opacity-50 disabled:cursor-not-allowed',
    ];
    switch (variant) {
      case 'primary':
        classes.push(
          'text-white bg-green-600 hover:bg-green-500 transition-colors duration-200 focus:outline-none focus:ring-0'
        );
        break;
      case 'secondary':
        classes.push('bg-black text-white');
        break;
      case 'tertiary':
        classes.push('bg-gray-800 text-white');
        break;
    }

    return classes.join(' ');
  };

  return (
    <button
      title={tooltipText}
      className={`${buttonClasses()} ${classes} max-w-32 truncate`}
      onClick={onClickHandler}
      aria-label={tooltipText || `click to ${text}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

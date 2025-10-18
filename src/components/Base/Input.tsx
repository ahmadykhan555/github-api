import { useEffect, useRef } from 'react';
import { BaseButton } from './Button';

type BaseInputProps = {
  autoFocus?: boolean;
  placeholder?: string;
  ctaText?: string;
  value: string;
  tooltipText?: string;
  onKeyDownHandler?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCtaClickHandler?: () => void;
};

const BaseInput: React.FC<BaseInputProps> = ({
  autoFocus,
  placeholder,
  ctaText,
  value,
  tooltipText,
  onKeyDownHandler,
  onChangeHandler,
  onCtaClickHandler,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onKeyDown={onKeyDownHandler}
        onChange={onChangeHandler}
        className="w-full px-4 py-3 pr-12 border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
      />
      {ctaText && (
        <BaseButton
          text={ctaText}
          classes={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-sm 
              focus:ring-green/30`}
          tooltipText={tooltipText}
          onClickHandler={onCtaClickHandler}
          variant="tertiary"
          disabled={!value}
        />
      )}
    </>
  );
};

export default BaseInput;

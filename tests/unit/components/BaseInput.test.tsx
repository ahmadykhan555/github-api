import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import BaseInput from '../../../src/components/Base/Input';

// Mock the BaseButton component
vi.mock('../../../src/components/Base/Button', () => ({
  BaseButton: ({
    text,
    onClickHandler,
    disabled,
    tooltipText,
    ...props
  }: {
    text: string;
    onClickHandler?: () => void;
    disabled?: boolean;
    tooltipText?: string;
    [key: string]: unknown;
  }) => (
    <button
      onClick={onClickHandler}
      disabled={disabled}
      title={tooltipText}
      data-testid="base-button"
      {...props}
    >
      {text}
    </button>
  ),
}));

describe('BaseInput', () => {
  const defaultProps = {
    id: 'test-input',
    value: '',
    placeholder: 'Test placeholder',
    onChangeHandler: vi.fn(),
  };

  describe('Rendering', () => {
    it('should render input with basic props', () => {
      render(<BaseInput {...defaultProps} />);

      const input = screen.getByRole('textbox');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'test-input');
      expect(input).toHaveAttribute('placeholder', 'Test placeholder');
      expect(input).toHaveAttribute('aria-label', 'Test placeholder');
      expect(input).toHaveValue('');
    });

    it('should render with custom value', () => {
      render(<BaseInput {...defaultProps} value="test value" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveValue('test value');
    });

    it('should not render CTA button when ctaText is not provided', () => {
      render(<BaseInput {...defaultProps} />);

      const button = screen.queryByTestId('base-button');
      expect(button).not.toBeInTheDocument();
    });

    it('should render CTA button when ctaText is provided', () => {
      render(<BaseInput {...defaultProps} ctaText="Search" />);

      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Search');
    });
  });

  describe('Event Handling', () => {
    it('should call onChangeHandler when input value changes', () => {
      const mockOnChange = vi.fn();
      render(<BaseInput {...defaultProps} onChangeHandler={mockOnChange} />);

      const input = screen.getByRole('textbox');
      fireEvent.change(input, { target: { value: 'new value' } });

      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'change',
        })
      );
    });

    it('should call onKeyDownHandler when key is pressed', () => {
      const mockOnKeyDown = vi.fn();
      render(<BaseInput {...defaultProps} onKeyDownHandler={mockOnKeyDown} />);

      const input = screen.getByRole('textbox');
      fireEvent.keyDown(input, { key: 'Enter' });

      expect(mockOnKeyDown).toHaveBeenCalledTimes(1);
      expect(mockOnKeyDown).toHaveBeenCalledWith(
        expect.objectContaining({
          key: 'Enter',
        })
      );
    });

    it('should call onCtaClickHandler when CTA button is clicked', () => {
      const mockOnCtaClick = vi.fn();
      render(
        <BaseInput
          {...defaultProps}
          value="test value"
          ctaText="Search"
          onCtaClickHandler={mockOnCtaClick}
        />
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(mockOnCtaClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Auto Focus', () => {
    it('should focus input when autoFocus is true', async () => {
      render(<BaseInput {...defaultProps} autoFocus={true} />);

      const input = screen.getByRole('textbox');

      await waitFor(() => {
        expect(input).toHaveFocus();
      });
    });

    it('should not focus input when autoFocus is false', () => {
      render(<BaseInput {...defaultProps} autoFocus={false} />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveFocus();
    });

    it('should not focus input when autoFocus is not provided', () => {
      render(<BaseInput {...defaultProps} />);

      const input = screen.getByRole('textbox');
      expect(input).not.toHaveFocus();
    });
  });

  describe('CTA Button State', () => {
    it('should disable CTA button when input value is empty', () => {
      render(<BaseInput {...defaultProps} ctaText="Search" value="" />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should disable CTA button when input value is only whitespace', () => {
      render(<BaseInput {...defaultProps} ctaText="Search" value="   " />);

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should enable CTA button when input has non-whitespace value', () => {
      render(<BaseInput {...defaultProps} ctaText="Search" value="test" />);

      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(
        <BaseInput {...defaultProps} placeholder="Search users" tooltipText="Click to search" />
      );

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-label', 'Search users');
    });

    it('should pass tooltipText to CTA button', () => {
      render(<BaseInput {...defaultProps} ctaText="Search" tooltipText="Click to search" />);

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Click to search');
    });
  });
});

import React, { forwardRef } from 'react';
import { classNames } from 'common/util';
import { Control } from 'react-hook-form';

export type TextboxProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  id?: string;
  control?: Control;
} & Omit<JSX.IntrinsicElements['input'], 'ref' | 'css'>;

export const Textbox = forwardRef<HTMLInputElement, TextboxProps>(
  (
    { placeholder, value, onChange, className = '', id, ...rest }: TextboxProps,
    ref
  ) => {
    return (
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={classNames(
          className,
          'text-sm px-2 py-3 border border-blackop-38 w-full hover:bg-gray-hover transition rounded font-light disabled:bg-blackop-6'
        )}
        id={id}
        ref={ref}
        {...rest}
      />
    );
  }
);

Textbox.displayName = 'Textbox';

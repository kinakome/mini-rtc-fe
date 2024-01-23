import React from 'react';
import { classNames } from 'common/util';

export type ButtonProps = {
  children: React.ReactChild;
  disable?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  isLoading?: boolean;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({
  children,
  disable = false,
  onClick,
  className = '',
  type = 'button',
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      data-disable={disable}
      onClick={onClick}
      className={classNames(
        className,
        'py-3 rounded text-sm transition',
        disable || isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
      )}
      disabled={disable || isLoading}
      type={type}>
      {isLoading ? (
        <div className="flex justify-center items-center h-5">
          <div className="w-4 h-4 rounded-full border-2 border-black-medium border-t-[transparent] animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const PrimaryButton = ({
  children,
  disable,
  onClick,
  className = '',
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      data-disable={disable}
      onClick={onClick}
      className={classNames(
        className,
        'text-white w-full text-sm transition bg-black-medium hover:opacity-75',
        disable || isLoading ? 'bg-black-medium' : 'bg-black-medium'
      )}
      disable={disable}
      {...rest}>
      {children}
    </Button>
  );
};

export const PrimaryFullButton = ({
  children,
  disable,
  onClick,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <PrimaryButton
      data-disable={disable}
      onClick={onClick}
      className={classNames(className, 'w-full')}
      disable={disable}
      {...rest}>
      {children}
    </PrimaryButton>
  );
};

export const PrimaryTextButton = ({
  children,
  disable,
  onClick,
  className = '',
  ...rest
}: ButtonProps) => {
  return (
    <Button
      data-disable={disable}
      onClick={onClick}
      className={classNames(
        className,
        'text-black-medium bg-transparent hover:bg-blackop-3'
      )}
      disable={disable}
      {...rest}>
      {children}
    </Button>
  );
};

export const DangerButton = ({
  children,
  disable,
  onClick,
  className = '',
  isLoading,
  ...rest
}: ButtonProps) => {
  return (
    <Button
      data-disable={disable}
      onClick={onClick}
      className={classNames(
        className,
        'text-white w-full text-sm transition bg-red hover:opacity-75',
        disable || isLoading ? 'bg-black-medium' : 'bg-black-medium'
      )}
      disable={disable}
      {...rest}>
      {children}
    </Button>
  );
};

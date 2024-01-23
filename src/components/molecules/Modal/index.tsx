import { classNames } from 'common/util';
import React from 'react';

export const Modal = ({
  setIsOpen,
  children,
  usePadding = true,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactChild;
  usePadding?: boolean;
}) => {
  return (
    <div className="flex fixed top-0 z-50 justify-center items-center p-4 w-screen h-screen bg-blackop-60">
      <div
        className={classNames(
          'w-96 bg-white drop-shadow-sm rounded',
          usePadding ? 'p-4' : ''
        )}>
        {children}
      </div>
    </div>
  );
};

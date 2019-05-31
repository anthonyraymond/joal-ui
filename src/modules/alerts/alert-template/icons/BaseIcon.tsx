import React, { ReactNode } from 'react';


type BaseIconProps = {
  className?: string,
  children: ReactNode
}

const BaseIcon: React.FC<BaseIconProps> = (props) => {
  const { className: classNameProps, children } = props

  return (
    <svg
      className={classNameProps}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ minWidth: 24 }}
    >
      {children}
    </svg>
  );
}
BaseIcon.defaultProps = {
  className: ''
};

export default BaseIcon;

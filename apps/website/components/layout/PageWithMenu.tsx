import React from 'react';

import { Menu } from 'components';
import { DataConfig } from '@ontour/types';

interface Props {
  children: JSX.Element;
  config: DataConfig;
}

export const PageWithMenu = ({ children, config }: Props) => {
  return (
    <>
      <Menu config={config} />
      {children}
    </>
  );
};

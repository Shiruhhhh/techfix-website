import { SkinOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Spin } from 'antd';
import React from 'react';
import HeaderDropdown from '../HeaderDropdown';

type GlobalHeaderRightProps = {
  children?: React.ReactNode;
};

// Sem login/logout — Cloudflare Access trata da autenticação no edge.
const menuItems: MenuProps['items'] = [
  {
    key: 'theme',
    icon: <SkinOutlined />,
    label: 'Tema',
  },
];

export const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ children }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const onMenuClick: MenuProps['onClick'] = (event) => {
    if (event.key === 'theme') {
      setInitialState((s) => ({ ...s, settingDrawerOpen: true }));
    }
  };

  if (!initialState) {
    return <Spin size="small" />;
  }

  return (
    <HeaderDropdown
      placement="bottomRight"
      menu={{
        selectedKeys: [],
        onClick: onMenuClick,
        items: menuItems,
      }}
      arrow
    >
      {children}
    </HeaderDropdown>
  );
};

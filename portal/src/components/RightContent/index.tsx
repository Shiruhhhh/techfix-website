import { BookOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import useHeaderActionStyles from './style';
import { VersionDropdown } from './VersionDropdown';

export const DocLink: React.FC = () => {
  const { styles } = useHeaderActionStyles();
  return (
    <Tooltip title="Documentação">
      <Button
        type="text"
        className={styles.action}
        icon={<BookOutlined />}
        aria-label="Documentação"
        href="https://pro.ant.design/docs/getting-started"
        target="_blank"
        rel="noreferrer"
      />
    </Tooltip>
  );
};

export { VersionDropdown };

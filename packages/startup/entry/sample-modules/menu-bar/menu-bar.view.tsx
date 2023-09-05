import * as React from 'react';

import { getIcon, useInjectable } from '@opensumi/ide-core-browser';
import { Button, Icon, Input } from '@opensumi/ide-core-browser/lib/components';
import { LAYOUT_VIEW_SIZE } from '@opensumi/ide-core-browser/lib/layout/constants';
import { VIEW_CONTAINERS } from '@opensumi/ide-core-browser/lib/layout/view-id';
import { CommandService } from '@opensumi/ide-core-common';
import { IconMenuBar } from '@opensumi/ide-menu-bar/lib/browser/menu-bar.view';

import * as styles from './menu-bar.module.less';
import { TOGGLE_RIGHT_PANEL_COMMAND } from '@opensumi/ide-main-layout/lib/browser/main-layout.contribution';
import { Avatar } from 'react-chat-elements';

/**
 * Custom menu bar component.
 * Add a logo in here, and keep
 * opensumi's original menubar.
 */
export const MenuBarView = () => {
  const commandService = useInjectable<CommandService>(CommandService);

  const handleSelectFocus = () => {
    // commandService.executeCommand('workbench.action.quickOpen');
  };

  const handleRun = () => {
    commandService.executeCommand('minidev.startDev');
  };

  const handleRightPanel = () => {
    commandService.executeCommand(TOGGLE_RIGHT_PANEL_COMMAND.id);
  }

  // quick-open-overlay
  return (
    <div
      id={VIEW_CONTAINERS.MENUBAR}
      className={styles.menu_bar_view}
      style={{ height: LAYOUT_VIEW_SIZE.MENUBAR_HEIGHT }}
    >
      {/* <span className={styles.menu_bar_logo} /> */}
      <div className={styles.container}>
        <div className={styles.left}>
          <IconMenuBar />
        </div>
        <div className={styles.center}>
          <div className={styles.run}>
            <Button size={'large'} onClick={handleRun} className={styles.btn}>
              <Icon className={getIcon('caret-right')} /> 运行
            </Button>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.input}>
            <Input
              className={styles.input_wrapper}
              width={'100%'}
              addonBefore={<Icon style={{ color: '#ffffff1f' }} className={getIcon('search')} />}
              placeholder='请搜索并选择指令'
              onFocus={handleSelectFocus}
            ></Input>
          </div>
          <div className={styles.ai_switch}>
            {/* <Icon className={getIcon('search')} onClick={handleRightPanel}/> */}
            <div style={{
                cursor: 'pointer',
              }}
              onClick={handleRightPanel}>
              <Avatar src={'https://mdn.alipayobjects.com/huamei_htww6h/afts/img/A*6Y9PQp_rk7QAAAAAAAAAAAAADhl8AQ/original'}  />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import { observer } from 'mobx-react-lite';
import React from 'react';

import { clx } from '@opensumi/ide-utils/lib/clx';

import styles from './progress.module.less';

import { IProgressModel } from '.';

export const ProgressBar: React.FC<{ progressModel: IProgressModel; className?: string }> = observer(
  ({ progressModel, className }) => {
    const { worked, total, show, fade } = progressModel;
    return (
      <div className={clx(className, styles.progressBar, { [styles.hide]: !show }, { [styles.fade]: fade })}>
        <div
          className={clx(styles.progress, { [styles.infinite]: !total })}
          style={total ? { width: (worked / total || 0.02) * 100 + '%' } : { width: '2%' }}
        ></div>
      </div>
    );
  },
);

export const Progress: React.FC<{
  loading: boolean;
}> = React.memo(({ loading }) => {
  if (!loading) {
    return null;
  }
  return (
    <div className={styles.progressBar}>
      <div className={clx(styles.progress, styles.infinite)} style={{ width: '2%' }} />
    </div>
  );
});

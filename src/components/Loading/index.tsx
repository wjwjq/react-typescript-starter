import * as React from 'react';
import { Spin } from 'antd';
import * as styles from './loading.less';

export default function Loading(props: any) {
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>;
  } else if (props.timedOut) {
    return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
  } else {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingInner}>
          <Spin size="large" />
          <span>加载中...</span>
        </div>
      </div>
    );
  }
}

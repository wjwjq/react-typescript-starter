/// <reference path='../index.d.ts'/>

import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from 'antd/lib/button';
import 'antd/lib/button/style/css';

import Hello from './Hello';
import * as imgSrc2 from '../assets/images/test2.jpg';

import * as styles from './App.css';

export default function App() {
  return (
    <div className={styles.container}>
      <div>
        <h3>router</h3>
        <Link to="/foo"> foo</Link>
      </div>

      <div>
        <h3>antd</h3>
        <Button type="primary">Test</Button>
        <h3>iconfont</h3>
        <i className="icon-shizhong" />
      </div>

      <div>
        <h3>redux</h3>
        <Hello />
      </div>

      <div>
        <h3>img</h3>
        <img src={imgSrc2} />
      </div>

    </div>
  );
}

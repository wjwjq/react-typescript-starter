import React from 'react';

interface Configuration {
  loader: () => Promise<any>;
  loading?: React.ComponentType;
}

// 组件异步加载 code split
// import('../views//Friend/Search')

export default function asyncComponentWrapper({ loader, loading }: Configuration) {
  return class AsyncComponent extends React.Component {

    Component?: React.ComponentType;
    Loading: React.ComponentType | undefined = loading;

    componentWillMount() {
      if (!this.Component) {
        loader()
          .then((module: any) =>  module.default)
          .then((Component: React.ComponentType) => {
            this.Component = Component;
            this.forceUpdate();
          });
      }
    }

    render() {
      return this.Component ? <this.Component {...this.props} /> : this.Loading ? <this.Loading /> : null;
    }
  };
}

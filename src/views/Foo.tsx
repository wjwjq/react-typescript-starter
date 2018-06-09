import * as React from 'react';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';
import { Table } from 'antd';
import { ColumnProps } from 'antd/lib/table';

import * as actions from '../redux/actions/foo';
import * as FooTypes from '../redux/types/foo';

interface IState {
  foo: FooTypes.IStoreState;
}

interface IOwnProps {
  users: FooTypes.TUsers;
}

interface IDispatchProps {
  fetchUser(action: any): void;
}

interface IOwnState {
  aaa: string;
}

const columns: Array<ColumnProps<FooTypes.IUser>> = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name'
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address'
}];

const mapStateToProps = ({ foo: { users } }: IState, ownProps: IOwnProps): IOwnProps => ({
  users: users!
});

const mapDispatchToProps = (dispatch: Dispatch<FooTypes.FetchUserActions>): IDispatchProps => bindActionCreators({
  fetchUser: actions.fetchUser
}, dispatch);

class Foo extends React.Component<IOwnProps & IDispatchProps, IOwnState> {

  state = {
    aaa: 'aaa'
  };

  public fetch = () => {
    this.props.fetchUser('12');
  }

  public render() {
    const { users } = this.props;

    return (
      <div>
        <Table columns={columns} dataSource={users} bordered={true} rowKey="_id" />
        <Button onClick={this.fetch} style={{ marginTop: 15 }}>加载</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo);

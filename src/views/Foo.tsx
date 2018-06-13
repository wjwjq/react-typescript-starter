import * as React from 'react';
import { Button } from 'antd';
import { bindActionCreators } from 'redux';
import { connect, Dispatch } from 'react-redux';

import * as actions from '../store/foo/actions';
import * as FooTypes from '../store/foo/types';
import { ApplicationState } from '../store/reducer';

interface IOwnProps {
  loading: boolean;
  fail: boolean;
  success: boolean;
  users?: FooTypes.TUsers;
}

interface IDispatchProps {
  fetchUser(action: any): any;
}

interface IOwnState {
  aaa: string;
}

const mapStateToProps = ({ foo }: ApplicationState): IOwnProps => ({ ...foo });

const mapDispatchToProps = (dispatch: Dispatch<FooTypes.TFooActions>): IDispatchProps => bindActionCreators({
  fetchUser: actions.fetchUserAsync
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
    const { aaa } = this.state;

    return (
      <div>
        {aaa}
        {renderUsers(users!)}
        <Button onClick={this.fetch} >加载</Button>
      </div>
    );
  }
}

function renderUsers(users: FooTypes.TUsers): React.ReactNodeArray {
  return users.map((user: FooTypes.IUser) => {
    return (
      <li key={user._id || user.id}>
        <span>{user.name}</span>
        <span>{user.age}</span>
        <span>{user.address}</span>
      </li>
    );
  });
}

export default connect(mapStateToProps, mapDispatchToProps)(Foo);

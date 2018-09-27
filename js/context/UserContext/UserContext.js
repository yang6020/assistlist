import React, { Component, createContext } from 'react';
import { addUser, getUser, removeUser } from '../../config/models';

const UserContext = createContext();

class UserProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  addUser = async () => {
    try {
      await addUser();
      await this.getCurrentUser();
    } catch (error) {
      console.log(error);
    }
  };
  removeCurrentUser = async () => {
    try {
      await removeUser();
    } catch (error) {
      console.log(error);
    }
  };
  getCurrentUser = async () => {
    try {
      let currentUser;
      await getUser().map(user => currentUser = user)
      this.setState({ currentUser })
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount() {
    this.getCurrentUser();
  }
  render() {
    return (
      <UserContext.Provider
        value={{
          ...this.state,
          addUser: this.addUser,
          removeUser: this.removeCurrentUser,
          getUser: this.getCurrentUser,
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}
export { UserProvider };
export default UserContext;

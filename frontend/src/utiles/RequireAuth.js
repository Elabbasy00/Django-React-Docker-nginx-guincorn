import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

export default function requireAuth(Component) {
  class AuthenticatedComponent extends React.Component {
    constructor(props) {
      super(props);
      this.checkAuth();
    }

    componentDidUpdate(prevProps, prevState) {
      this.checkAuth();
    }

    checkAuth() {
      if (!this.props.isAuthenticated) {
        const redirectAfterLogin = this.props.location.pathname;
        this.props.dispatch(push(`/login?next=${redirectAfterLogin}`));
      }
    }

    render() {
      return (
        <>
          {this.props.isAuthenticated === true ? (
            <Component {...this.props} />
          ) : null}
        </>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      isAuthenticated: state.auth.isAuthenticated,
      token: state.auth.token,
    };
  };

  return connect(mapStateToProps)(AuthenticatedComponent);
}
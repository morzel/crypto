import React, { Component } from 'react';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { inject, observer } from 'mobx-react';
import authStore from '../../../stores/authStore';

@inject('authStore')
@observer
class Auth extends Component {
  state = {
    register: true,
    login: false
  };
  toggleForm = e => {
    const register = document.getElementById('register');
    const login = document.getElementById('login');
    if (e.target.id === 'register') {
      register.classList.add('register-active');
      login.classList.remove('register-active');
      this.setState({
        register: true,
        login: false
      });
    } else {
      login.classList.add('register-active');
      register.classList.remove('register-active');
      this.setState({
        register: false,
        login: true
      });
    }

    console.log(this.state);
  };
  render() {
    const { values, errors } = this.props;
    return (
      <section className="hero auth">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <div className="box">
                <div className="columns is-mobile auth-buttons">
                  <div className="column is-half-mobile">
                    <button
                      onClick={this.toggleForm}
                      id="register"
                      className="button is-fullwidth auth-active"
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="column is-half-mobile">
                    <button id="login" onClick={this.toggleForm} className="button is-fullwidth">
                      Log in
                    </button>
                  </div>
                </div>
                <Form>
                  <div className="field">
                    <div className="control">
                      <div className="help has-text-grey-dark">Username</div>
                      <Field
                        field="name"
                        className={`input ${errors.name ? 'is-danger' : ''}`}
                        name="name"
                        autoComplete="username"
                        placeholder="Your Username"
                      />
                      {errors.name && <p className="help is-danger">{errors.name}</p>}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div className="help has-text-grey-dark">Email</div>
                      <Field
                        field="email"
                        className={`input ${errors.email ? 'is-danger' : ''}`}
                        placeholder="Your Email"
                        name="email"
                        type="email"
                        autoComplete="email"
                      />
                      {errors.email && <p className="help is-danger">{errors.email}</p>}
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div className="help has-text-grey-dark">Password</div>
                      <Field
                        field="password"
                        className={`input ${errors.password ? 'is-danger' : ''}`}
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Your Password"
                      />
                      {errors.password && <p className="help is-danger">{errors.password}</p>}
                    </div>
                  </div>
                  <button type="submit" className="button is-block is-info is-fullwidth">
                    Sign Up
                  </button>
                  <a href="/" className="help">
                    Forgot your password?
                  </a>
                  {/* TODO: add oauth options ? */}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const FormikAuth = withFormik({
  mapPropsToValues() {
    return {
      name: '',
      email: '',
      password: ''
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .required()
      .min(3),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(6)
      .required()
  }),
  handleSubmit(values, errors) {
    // post request goes here
    if (this.state.register) this.props.authStore.register();
  }
})(Auth);

export default FormikAuth;
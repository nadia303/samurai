import { reduxForm, Field } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Element } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "./../common/FormsControls/FormControls.module.css";

const Input = Element("input");

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(
      formData.email,
      formData.password,
      formData.rememberMe,
      formData.captcha
    );
    console.log(formData);
  };
  if (props.isAuth) {
    return <Redirect to={"/profile"} />;
  }
  return (
    <div>
      <h2>LOGIN</h2>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const LoginForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder={"Email"}
          name={"email"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder={"Password"}
          name={"password"}
          type={"password"}
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field type={"checkbox"} name={"rememberMe"} component={Input} />
        <span>remember me</span>
      </div>

      {props.captchaUrl && <img src={props.captchaUrl} />}
      {props.captchaUrl && (
        <div>
          <Field
            placeholder={"Symbols from image"}
            name={"captcha"}
            component={Input}
            validate={[required]}
          />
        </div>
      )}
      {props.error && (
        <div className={styles.formSummaryError}> {props.error}</div>
      )}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  //a unique name for the form
  form: "login",
})(LoginForm);

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

// export default Login;
export default connect(mapStateToProps, { login })(Login);

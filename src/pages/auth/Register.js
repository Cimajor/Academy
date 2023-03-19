import React, { useState } from "react";
import Logo from "../../images/logo.png";
import LogoDark from "../../images/logo-dark.png";
import PageContainer from "../../layout/page-container/PageContainer";
import Head from "../../layout/head/Head";
import AuthFooter from "./AuthFooter";
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Button,
  Icon,
  PreviewCard,
} from "../../components/Component";
import { Spinner, FormGroup, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utils/Database";
import { useAuth } from "../../context/AuthContext";
import LogoSchoolless from "../../images/Schoolless_logo_1.png";

const Register = ({ history }) => {
  const [passState, setPassState] = useState(false);
  const [loading, setLoading] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const { signup } = useAuth();

  const handleFormSubmit = (formData) => {
    setLoading(true);
    signup(formData.email, formData.passcode, formData.fname, formData.lname);

    // createUserWithEmailAndPassword(auth, formData.email, formData.passcode)
    // .then((userCredential) => {
    //   // Signed in
    //   const user = userCredential.user;
    //   setTimeout(() => history.push(`${process.env.PUBLIC_URL}/auth-login`), 2000);
    //   // ...
    // })
    // .catch((error) => {
    //   const errorCode = error.code;
    //   const errorMessage = error.message;
    //   // ..
    // });
  };
  return (
    <React.Fragment>
      <Head title="Register" />
      <PageContainer>
        <Block className="nk-block-middle nk-auth-body  wide-xs">
          <div className="brand-logo pb-4 text-center">
            <Link to={process.env.PUBLIC_URL + "/"} className="logo-link">
              <img className="logo-light logo-img logo-img-lg" src={LogoSchoolless} alt="logo" />
              <img className="logo-dark logo-img logo-img-lg" src={LogoSchoolless} alt="logo-dark" />
            </Link>
          </div>
          <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
            <BlockHead>
              <BlockContent>
                <BlockTitle tag="h4">Register</BlockTitle>
                <BlockDes>
                  <p>Create New Scholless Account</p>
                </BlockDes>
              </BlockContent>
            </BlockHead>
            <form className="row gy-4" onSubmit={handleSubmit(handleFormSubmit)}>
              <Col md="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Email
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="default-01"
                      name="email"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="Enter your email address or username"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      First Name
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="default-01"
                      name="fname"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="Enter your email address or username"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="default-01">
                      Last Name
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <input
                      type="text"
                      bssize="lg"
                      id="default-01"
                      name="lname"
                      ref={register({ required: true })}
                      className="form-control-lg form-control"
                      placeholder="Enter your email address or username"
                    />
                    {errors.email && <p className="invalid">This field is required</p>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <div className="form-label-group">
                    <label className="form-label" htmlFor="password">
                      Passcode
                    </label>
                  </div>
                  <div className="form-control-wrap">
                    <a
                      href="#password"
                      onClick={(ev) => {
                        ev.preventDefault();
                        setPassState(!passState);
                      }}
                      className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                    >
                      <Icon name="eye" className="passcode-icon icon-show"></Icon>

                      <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                    </a>
                    <input
                      type={passState ? "text" : "password"}
                      id="password"
                      name="passcode"
                      ref={register({ required: "This field is required" })}
                      placeholder="Enter your passcode"
                      className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                    />
                    {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                  </div>
                </FormGroup>
              </Col>
              <Col md="12">
                <FormGroup>
                  <Button type="submit" color="primary" size="lg" className="btn-block">
                    {loading ? <Spinner size="sm" color="light" /> : "Register"}
                  </Button>
                </FormGroup>
              </Col>
            </form>
            <div className="form-note-s2 text-center pt-4">
              {" "}
              Already have an account?{" "}
              <Link to={`${process.env.PUBLIC_URL}/auth-login`}>
                <strong>Sign in instead</strong>
              </Link>
            </div>
            <div className="text-center pt-4 pb-3">
              <h6 className="overline-title overline-title-sap">
                <span>OR</span>
              </h6>
            </div>
            <ul className="nav justify-center gx-8">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Facebook
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="#socials"
                  onClick={(ev) => {
                    ev.preventDefault();
                  }}
                >
                  Google
                </a>
              </li>
            </ul>
          </PreviewCard>
        </Block>
        <AuthFooter />
      </PageContainer>
    </React.Fragment>
  );
};
export default Register;

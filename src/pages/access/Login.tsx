import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import oxigent_logo from "../../images/oxigent_logo.png";
import { userSessionReactVar } from "../../cache";
import { getUserFromToken } from "./sessionToken";
import { Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';

import { CREATE_LOGIN_TOKEN } from "./CreateTokenMutation";

const esquema_validacion = Yup.object({
  username: Yup.string()
    .min(5, "Debe tenér más de 5 caracteres")
    .required("Requerido"),
  password: Yup.string()
    .min(6, "Debe tener más de 6 caracteres")
    .required("Requerido"),
});

const Login = () => {
  const [CredentialsCreateToken, { loading }] = useMutation(CREATE_LOGIN_TOKEN);
  let navigate = useNavigate();
  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        general: "", //a virtual property for errors handling
      }}
      onSubmit={(values, actions) => {
        CredentialsCreateToken({
          variables: {
            user: values.username,
            password: values.password,
          },
        })
          .then((data) => {
            console.log(data);
            console.log(data.data.credentialsCreateToken);
            const authresponse: any = data.data.credentialsCreateToken;
            if (authresponse.success) {
              const token: string = authresponse.token;
              localStorage.setItem("token", token);
              //extract users session and save in the apollo cache
              userSessionReactVar(getUserFromToken(token));
              console.log("---user2:");
              console.log(authresponse.user);
              console.log(authresponse.user.mustChangePassword);
              if (authresponse.user.mustChangePassword) {
                alert("A continuación debe cambiar su password");
                navigate("/change-password");
              } else {
                alert("Sesión iniciada");
                navigate("/");
              }
            } else {
              actions.setFieldError("general", authresponse.message);
            }
          })
          .catch((error) => {
            console.log(error);
            actions.setFieldError("general", error.message);
          })
          .finally(() => {
            actions.setSubmitting(false);
          });
      }}
      validationSchema={esquema_validacion}
    >
      {(props) => (
        <div>
          <Form onSubmit={props.handleSubmit}>
            <Field
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              name="username"
              placeholder="email"
              component={TextField}
            />
            {props.touched.username && props.errors.username ? (
              <div>{props.errors.username}</div>
            ) : null}
            <Field
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
              placeholder="password"
              autoComplete="current-password"
              id="current-password"
              component={TextField}
            />
            {props.touched.password && props.errors.password ? (
              <div>{props.errors.password}</div>
            ) : null}
            <div style={{ color: "red" }}>{props.errors.general}</div>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              // onClick={submitForm}
              type="submit"
            >
              Iniciar la sesión{" "}
            </Button>
          </Form>
          <Typography>
            <img src={oxigent_logo} width="200px" alt="Logo del Instituto" />
          </Typography>
        </div>
      )}
    </Formik>
  );
};

export default Login;

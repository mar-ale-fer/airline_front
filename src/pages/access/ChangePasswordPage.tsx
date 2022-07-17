import { Formik, Form, Field } from "formik";
import { useMutation } from "@apollo/client";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import oxigent_logo from "../../images/oxigent_logo.png";
import { Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { USER_CHANGE_OWN_PASSWORD } from "../users/operations/UserChangeOwnPasswordMutation";

const esquema_validacion = Yup.object({
  password: Yup.string()
  .min(8, 'Debe tener al menos 8 caracteres')
  .required('Requerido'),
  passwordConfirmation: Yup.string()
  .oneOf([Yup.ref('password')], 'Las claves deben coincidir')
});

const ChangePasswordPage = () => {
  const [userOwnChangePassword, { loading }] = useMutation(USER_CHANGE_OWN_PASSWORD);
  let navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        password: "",
        passwordConfirmation:"",
        general: "", //a virtual property for errors handling
      }}
      onSubmit={(values, actions) => {
        userOwnChangePassword({
          variables: {
            password: values.password,
          },
        })
          .then((data) => {
            console.log(data);
            console.log(data.data.userOwnChangePassword);
            const authresponse: any = data.data.userOwnChangePassword;
            if (authresponse.success) {
              alert("Cambiaste correctamente tu password");
              navigate("/");
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
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              name="password"
              placeholder="password"
              component={TextField}
            />
            {props.touched.password && props.errors.password ? (
              <div>{props.errors.password}</div>
            ) : null}
            <Field
              type="password"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.passwordConfirmation}
              name="passwordConfirmation"
              placeholder="passwordConfirmation"
              component={TextField}
            />
            {props.touched.passwordConfirmation && props.errors.passwordConfirmation ? (
              <div>{props.errors.passwordConfirmation}</div>
            ) : null}
            <div style={{ color: "red" }}>{props.errors.general}</div>
            <Button
              variant="contained"
              color="primary"
              disabled={loading}
              // onClick={submitForm}
              type="submit"
            >
              Cambiar password{" "}
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

export default ChangePasswordPage;

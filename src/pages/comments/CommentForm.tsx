import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { TextField, CheckboxWithLabel  } from 'formik-material-ui';
import { useNavigate } from 'react-router-dom';
import { Button, FormGroup, FormControl } from '@material-ui/core';

const options = [
    {label:'tag1', value:'tag1'},
    {label:'tag2', value:'tag2'},
    {label:'tag3', value:'tag3'},
    {label:'tag4', value:'tag4'},
    {label:'tag5', value:'tag5'}
]

export type commentForm =  {
    text:string,
    tags: string[],
    general:string
}

const validation_schema = Yup.object({
    text: Yup.string()
    .min(2, 'Must have at least two letters')
    .required('Requerido'),
    tags: Yup.array()
    .min(1,"Must assign at least one tag")
    .max(3,"Cannot assign more than 3 tags")

})

interface CommentFormProps {
    initial_values : commentForm, 
    handleSubmit : (values: commentForm , actions: FormikHelpers<commentForm>) => void,
    loading :boolean,
    button_label: string
}
export const CommentForm = ( {
    initial_values,
    handleSubmit,
    loading,
    button_label

} : CommentFormProps
    ) => {

    return (
        <Formik 
            initialValues={initial_values}
            onSubmit={(values, actions)=> handleSubmit(values,actions)}
            enableReinitialize={true}
            validationSchema={validation_schema}
        >
            {props =>(
                <Form onSubmit={props.handleSubmit}>
                    <Field 
                        type="text"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.text}
                        name="text"
                        placeholder="Comment"
                        component={TextField}
                    />
                    {props.touched.text && props.errors.text ?
                    (<div>{props.errors.text}</div>) : null}     

                    <FormControl component="fieldset" style={{ display: "flex"}}>
                        <FormGroup>
                            {options.map(opt => (
                                <Field 
                                    type="checkbox"
                                    component={CheckboxWithLabel}
                                    key={opt.value}
                                    name="tags"
                                    value={opt.value}
                                    Label={{label: opt.label}}
                                    
                                />
                            ))}
                        </FormGroup>  
                    </FormControl>
                    {props.touched.tags && props.errors.tags ?
                    (<div>{props.errors.tags}</div>) : null} 

                    <Button variant="contained" color="primary" disabled={loading} type="submit">
                        {button_label}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}


import { FormikHelpers } from 'formik';
import { useMutation } from '@apollo/client';
import { ADD_COMMENT_TO_FLIGHT } from '../flights/operations/addCommentToFlight';
import { flightCommentsNeedsRefresh_RV } from '../../cache';
import {CommentForm, commentForm} from './CommentForm';
import { usersPageNeedsRefresh_RV } from '../../cache';
import * as log  from 'loglevel';

const initial_values : commentForm= {
    text:"",
    tags:[],
    general:""
}

const CommentCreatePage = (props: { flightId: any, random: any }) => {
    const {
        flightId,
    } = props

    const [addCommentToFlight, { loading }] = useMutation(ADD_COMMENT_TO_FLIGHT);

    const handleSubmit = (values: commentForm , actions: FormikHelpers<commentForm>) => {
        log.info('create_comment_onsubmit')
        addCommentToFlight({variables: {
            flightId,
            text: values.text,
            tags: values.tags,
        }})
        .then((data)=>{
            const response: any = data.data.addCommentToFlight
            if((response.success) as boolean) {
                flightCommentsNeedsRefresh_RV( Math.random().toString(36) as string)
                actions.resetForm({
                    values: initial_values
                }); 
            } else {
                alert(response.message)
                actions.setFieldError('general', response.message)
            }
        })
        .catch(error => {
            actions.setFieldError('general', 'Error sending form:'+ error.message)
        })
        .finally(()=>{
            actions.setSubmitting(false)
        })
        actions.setSubmitting(false);    
    } 

    return (

        <CommentForm initial_values={initial_values}
            handleSubmit={handleSubmit}
            loading={loading}
            button_label='Add comment'
        />

    )
}

export default CommentCreatePage
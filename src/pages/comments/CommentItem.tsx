import { Avatar, Grid, ListItem, ListItemAvatar } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
export function CommentItem( props : any) {
  const {
    comment
  } = props

  console.log(comment)
  return (
      <ListItem
      key = {`comment_item_${comment.id}`}

    >
      <ListItemAvatar>
        <Avatar>
          <ChatBubbleOutlineIcon />
        </Avatar>
      </ListItemAvatar>
      <Grid container>
        <Grid item xs={12}>
          {comment.text}
        </Grid>
        <Grid item xs={12}>
          tags: {comment.tags}
        </Grid>
        <Grid item xs={12}>
          user: {comment.user.email}
        </Grid>
        <Grid item xs={12}>
          role: {comment.user.roles.roles[0]}
        </Grid>
      </Grid>
    </ListItem>
  );
}
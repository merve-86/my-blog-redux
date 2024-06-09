import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import useBlogCalls from "../../hooks/useBlogCalls";

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState("");
  const { addComment, getBlogComments } = useBlogCalls();

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      const newComment = {
        blogId,
        comment,
      };
      await addComment(newComment);
      await getBlogComments(blogId);
      setComment("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} mt={3}>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        label="comment"
        placeholder="Add a comment"
        onChange={(e) => setComment(e.target.value)}
      />
      <Button variant="contained" type="submit" color="primary" sx={{ mt: 2 }}>
        Add Comment
      </Button>
    </Box>
  );
};

export default CommentForm;

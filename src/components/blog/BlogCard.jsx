import * as React from "react";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, Stack } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import useBlogCalls from "../../hooks/useBlogCalls";
import { btnStyle } from "../../styles/globalStyles";

export default function BlogCard({ blog, handleOpen }) {
  const { getCommentsCount } = useBlogCalls();
  const [commentsCount, setCommentsCount] = useState(0);

  useEffect(() => {
    if (blog && blog._id) {
      const fetchCommentsCount = async () => {
        const count = await getCommentsCount(blog._id);
        setCommentsCount(count);
      };
      fetchCommentsCount();
    }
  }, [blog, getCommentsCount]);

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "300px",
        height: "400px",
        p: 2,
      }}
    >
      <CardMedia
        component="img"
        alt={blog?.title}
        height="140"
        image={blog?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {blog?.content}
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={2}>
          Published Date:{" "}
          {blog ? new Date(blog.createdAt).toLocaleDateString("tr-TR") : ""}
        </Typography>
        <Stack
          mt={3}
          direction="row"
          gap={3}
          justifyContent="center"
          alignItems="center"
          color="text.secondary"
        >
          <FavoriteIcon sx={btnStyle} />
          <Stack direction="row" alignItems="center">
            <ChatBubbleOutlineIcon sx={btnStyle} />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {commentsCount}
            </Typography>
          </Stack>
          <VisibilityIcon sx={btnStyle} />
          <Button
            sx={{ border: "1px solid", bgcolor: "#E3D026", color: "white" }}
            onClick={handleOpen}
          >
            Read More
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

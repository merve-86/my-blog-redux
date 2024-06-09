import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import BlogCard from "../components/blog/BlogCard";
import Pagination from "@mui/material/Pagination";
import { CardSkeleton, NoDataMessage } from "../components/DataFetchMessages";
import useBlogCalls from "../hooks/useBlogCalls";

const Dashboard = () => {
  const { getBlog } = useBlogCalls();
  const { blogs, loading } = useSelector((state) => state.blog);

  const [page, setPage] = useState(1);
  const blogsPerPage = 8;

  useEffect(() => {
    getBlog("blogs", page, blogsPerPage);
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      {loading && (
        <CardSkeleton>
          <BlogCard />
        </CardSkeleton>
      )}
      {!loading && !blogs.length && <NoDataMessage />}
      {!loading && blogs.length > 0 && (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {blogs
            .slice((page - 1) * blogsPerPage, page * blogsPerPage)
            .map((blog) => (
              <Grid item key={blog._id}>
                <BlogCard blog={blog} />
              </Grid>
            ))}
        </Grid>
      )}
      <Grid container justifyContent="center" mt={5}>
        <Pagination
          count={Math.ceil(blogs.length / blogsPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Grid>
    </div>
  );
};

export default Dashboard;

// import { useSelector } from "react-redux";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
// import BlogCard from "../components/blog/BlogCard";

// import TableSkeleton, {
//   CardSkeleton,
//   ErrorMessage,
//   NoDataMessage,
// } from "../components/DataFetchMessages";
// import useBlogCalls from "../hooks/useBlogCalls";
// import NewBlog from "./NewBlog";

// const Dashboard = () => {
//   const { getBlog } = useBlogCalls();
//   const { blogs, loading, error } = useSelector((state) => state.blog);

//   useEffect(() => {
//     getBlog("blogs");
//   }, []);

//   return (
//     <div>
//       {loading && (
//         <CardSkeleton>
//           <BlogCard />
//         </CardSkeleton>
//       )}

//       {!loading && !blogs.length && <NoDataMessage />}
//       {!loading && blogs.length > 0 && (
//         <Grid container gap={2} mt={3} justifyContent={"center"}>
//           {blogs.map((blog) => (
//             <Grid item key={blog._id}>
//               <BlogCard blog={blog} />
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

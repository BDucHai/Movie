import Home from "../pages/Home";
import SingleMovie from "../pages/SingleMovie";
import Genre from "../pages/Genre";
import ListSearchMovie from "../pages/ListSearchMovie";
const publicRoutes = [
    { path: "/", component: Home },
    { path: "movies/:movieName/:movieID", component: SingleMovie },
    { path: "genre/:gen", component: Genre },
    { path: "search/:title", component: ListSearchMovie },
];

export { publicRoutes };

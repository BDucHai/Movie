import Search from "../Search";
import { logo } from "../../assets";

import { Link } from "react-router-dom";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./Nav.module.scss";

import DehazeIcon from "@mui/icons-material/Dehaze";
import { Button, SwipeableDrawer } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { KeyboardArrowDown } from "@mui/icons-material";

const cx = classNames.bind(styles);
const Nav = () => {
    const [open, setOpen] = useState(false);
    const [genres, setGenres] = useState([]);
    const [tab, setTab] = useState(false);
    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://moviesminidatabase.p.rapidapi.com/genres/",
            headers: {
                "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setGenres(response.data.results);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [genres]);
    return (
        <header className="sticky top-0 z-10 bg-[#0a0e0f] relative text-[#78909c] px-[20px] md:px-[80px] flex justify-between shadow-md shadow-[#07a1eb45]">
            <div className="flex items-center">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
                <div className="lg:flex hidden ml-6 h-full items-center">
                    <div className="text-white mx-4 cursor-pointer  text-[17px]">
                        <a href="/">Trang chủ</a>
                    </div>
                    <div className="text-white mx-4 cursor-pointer  text-[17px]">
                        <a href="/">Top Film</a>
                    </div>
                    <div className={cx("list-genre")}>
                        <a href="/">Thể loại</a>
                        <KeyboardArrowDown className={cx("arrow-genre")} />
                        <ul className={cx("genres")}>
                            {genres.map((genr, index) => (
                                <Link to={`/genre/${genr.genre}`}>
                                    <li key={index} className="px-[16px] py-[6px] text-[#333] hover:text-[#7d7d7d]">
                                        <a
                                            href={`/genre/${genr.genre}`}
                                            className="text-ellipsis overflow-hidden w-full text-[14px] font-normal">
                                            {genr.genre}
                                        </a>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                    <div className="text-white mx-4 cursor-pointer  text-[17px]">
                        <a href="/">Trailer</a>
                    </div>
                </div>
            </div>
            <div className="lg:hidden flex">
                <Search />
            </div>
            <div className="flex items-center">
                <div className="lg:flex hidden">
                    <Search />
                </div>
                <Fragment>
                    <Button onClick={() => setOpen(true)}>
                        <DehazeIcon sx={{ display: { xs: "flex", lg: "none" } }} color="white" />
                    </Button>
                    <SwipeableDrawer
                        anchor="left"
                        open={open}
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}>
                        <div
                            className={`min-h-[100vh] w-[320px] pt-[40px] pb-[10px] bg-[#0f1416] 
                            `}>
                            <div className="px-[40px]">
                                <Button
                                    size="medium"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "red",
                                        marginBottom: "15px",
                                        width: "100%",
                                    }}>
                                    Sign Up
                                </Button>
                            </div>
                            <div className="bg-[#0f1416] px-[40px] pb-[16px]">
                                <div className="text-white my-4 cursor-pointer text-[17px]">
                                    <a href="/">Trang chủ</a>
                                </div>
                                <div className="text-white my-4 cursor-pointer text-[17px]">
                                    <a href="/">Top Film</a>
                                </div>
                                <div className={cx("list-genre-tab")}>
                                    <div onClick={() => setTab((prev) => !prev)}>
                                        <a href="#">Thể loại</a>
                                        <KeyboardArrowDown
                                            className={cx(`${tab ? "arrow-genre-tab-active" : "arrow-genre-tab"}`)}
                                        />
                                    </div>
                                    <ul className={cx(`${tab ? "genres-tab-active" : "genres-tab"}`)}>
                                        {genres.map((genr, index) => (
                                            <Link to={`/genre/${genr.genre}`}>
                                                <li
                                                    key={index}
                                                    className="pl-[6px] py-[6px] text-white hover:text-[#7d7d7d]">
                                                    <a
                                                        href={`/genre/${genr.genre}`}
                                                        className="text-ellipsis overflow-hidden w-full text-[14px] font-normal">
                                                        {genr.genre}
                                                    </a>
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                                <div className="text-white my-4 cursor-pointer  text-[17px]">
                                    <a href="/">Trailer</a>
                                </div>
                            </div>
                        </div>
                    </SwipeableDrawer>
                </Fragment>
                <Button
                    size="medium"
                    variant="contained"
                    sx={{ display: { xs: "none", lg: "block" }, backgroundColor: "red", marginLeft: "8px" }}>
                    Sign Up
                </Button>
            </div>
        </header>
    );
};

export default Nav;

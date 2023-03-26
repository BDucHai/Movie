import React from "react";
import { Link } from "react-router-dom";

import classNames from "classnames/bind";
import styles from "./BannerMovie.module.scss";
import { Button } from "@mui/material";
import { PlayCircleOutline, YouTube } from "@mui/icons-material";

const cx = classNames.bind(styles);
const BannerMovie = ({ data, event }) => {
    return (
        <div className={cx("banner")}>
            <img src={data.banner} alt="" className="w-full max-h-[500px] object-cover opacity-[0.7]" />
            <Link href="/" className={cx("icon-play")} />
            <img
                src={data.image_url}
                alt="movie-img"
                className={cx('movie-img')}
            />
            <div className={cx("info")}>
                <h2 className="mb-[14px] text-[30px] font-medium leading-[31px]">{data.title}</h2>
                <div>
                    <Button variant="contained" sx={{ marginRight: "4px", padding: "6px 12px" }} onClick={event}>
                        <YouTube />
                        <p className="font-bold">Trailer</p>
                    </Button>
                    <Button variant="contained" color="error" sx={{padding: "6px 12px" }}>
                        <PlayCircleOutline />
                        <p className="font-bold">Xem Phim</p>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default BannerMovie;

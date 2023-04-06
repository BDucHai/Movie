import React from "react";

import classNames from "classnames/bind";
import styles from "./MovieSurface.module.scss";

const cx = classNames.bind(styles);
const MovieSurface = ({ to, data, width = "180px", height = "250px", minHeight }) => {
    return (
        <>
            <a href={to} className={cx("post")}>
                <article className={`w-[${width}] h-[${height}] mx-6`}>
                    <figure className="relative cursor-pointer">
                        <div className={cx("tab")}>
                            <img
                                src={data.banner}
                                alt="pic"
                                className={`object-cover w-full min-h-[${minHeight}] max-h-[${minHeight}] rounded-[5px]`}
                            />
                        </div>
                        <span className="absolute top-[4px] right-[2px] px-2 text-[14px] rounded-[5px] text-[#ccc] bg-[#903a3a]">
                            {data.rating}
                        </span>
                        <div className="absolute bottom-[0px] w-full bg-[#030303bf]">
                            <h2 className="text-[14px] text-white my-2 mx-1 whitespace-nowrap text-ellipsis overflow-hidden text-center">
                                {data.title}
                            </h2>
                        </div>
                    </figure>
                </article>
            </a>
        </>
    );
};

export default MovieSurface;

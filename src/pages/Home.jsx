import React, { useEffect, useState } from "react";

import { CircularProgress } from "@mui/material";

import { banner } from "../assets";
import Nav from "../components/Nav/Nav";
import Footer from "../components/Footer";
import ModalMovie from "../components/ModalMovie";
import RecommendCategory from "../components/RecommendCategory/RecommendCategory";

const Home = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const handle = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => {
            clearTimeout(handle);
        };
    });
    return (
        <>
            <div
                className={`${
                    loading ? "block" : "hidden"
                } w-full h-[100vh] flex items-center justify-center text-[50px]`}>
                <CircularProgress disableShrink />
            </div>
            <div className={`${loading ? "hidden" : "block"} bg-[#263238]`}>
                <Nav />
                <ModalMovie>
                    <div className="p-[20px] mt-[22px] mb-[27px] bg-[#423e3e] text-[16px] text-[#ffc107] uppercase">
                        Chúc mọi người có một trải nghiệm xem phim thật vui vẻ!!!
                    </div>
                    <div>
                        <img src={banner} alt="" />
                    </div>
                    <RecommendCategory data="byPopularity" name="Phim phổ biến" />
                    <div className="mt-[80px]"></div>
                    <RecommendCategory data="byRating" name="Phim được đánh giá cao" />
                </ModalMovie>
                <Footer />
            </div>
        </>
    );
};

export default Home;

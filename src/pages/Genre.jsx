import React, { useEffect, useState } from "react";
import axios from "axios";

import Nav from "../components/Nav/Nav";
import ModalMovie from "../components/ModalMovie";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import MovieSurface from "../components/MovieSurface/MovieSurface";

const Genre = () => {
    document.title ="Thể Loại"
    const { gen } = useParams();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const handleNext = () => {
        setPage(2);
    };
    useEffect(() => {
        const options = {
            method: "GET",
            url: `https://moviesminidatabase.p.rapidapi.com/movie/byGen/${gen}/?page=${page}`,
            headers: {
                "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
            },
        };
        const fetchApi = async () => {
            const res = await axios.request(options).then(function (response) {
                return response.data.results;
            });
            const result = res.filter((_, index) => {
                return index < 35;
            });
            await result.forEach((mov) => {
                const options1 = {
                    method: "GET",
                    url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${mov.imdb_id}`,
                    headers: {
                        "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                        "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
                    },
                };
                axios.request(options1).then(function (response) {
                    setMovies((prev) => [...prev, response.data.results]);
                });
            });
            setLoading(false);
        };
        fetchApi();
        return () => {
            setMovies([]);
        };
    }, [page]);
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
                    <div className="p-[6px]">
                        {/* Title and notice */}
                        <div>
                            <div className="w-full flex items-center justify-between mb-[5px]">
                                <span className="py-[16px] text-[25px] text-[#ff8a00] font-bold uppercase">{gen}</span>
                                <Button
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#fff",
                                        height: "36px",
                                        borderRadius: "3px",
                                        color: "#000",
                                    }}>
                                    Lọc phim
                                </Button>
                            </div>
                            <div className="bg-[#d43939] text-[14px] text-[#fff] px-[10px] py-[5px] mb-[10px]">
                                <p>
                                    MẸO SỬ DỤNG: Sử dụng chức năng Lọc Anime trên thanh công cụ để lọc những phim bạn
                                    đang cần xem chính xác nhất.
                                </p>
                            </div>
                            <div className="p-[20px] mt-[22px] mb-[27px] bg-[#423e3e] text-[14px] text-white">
                                <a href={`/genre/${gen}`} className="font-bold mr-[6px] text-[#ff8a00]">
                                    {gen}
                                </a>
                                mới nhất ,Tổng hợp danh sách các bộ phim hay được web cập nhật liên tục.Tải hơn 10.000
                                bộ phim hanh dong năm 2022,2023 vietsub, thuyết minh mới nhất, hay nhất
                            </div>
                        </div>
                        {/* Show Movieeee */}
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-x-[8px] gap-y-[12px]">
                            {movies.map((movie) => (
                                <div key={movie.imdb_id}>
                                    <MovieSurface
                                        width="100%"
                                        minHeight={"255px"}
                                        data={movie}
                                        to={`/movies/${movie.title}/${movie.imdb_id}`}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* Control Page */}
                        <div onClick={handleNext} className="flex justify-center mt-[30px] mb-[20px]">
                            <div className="flex text-white text-[16px]">
                                <div
                                    className={`${
                                        page % 5 === 1 ? "bg-[#b71c1c]" : "bg-[#242d31] hover:bg-[#ffc107]"
                                    } w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer`}
                                    onClick={() => setPage(1)}>
                                    1
                                </div>
                                <div
                                    className={`${
                                        page % 5 === 2 ? "bg-[#b71c1c]" : "bg-[#242d31] hover:bg-[#ffc107]"
                                    } w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer`}
                                    onClick={() => setPage(2)}>
                                    2
                                </div>
                                <div
                                    className={`${
                                        page % 5 === 3 ? "bg-[#b71c1c]" : "bg-[#242d31] hover:bg-[#ffc107]"
                                    } w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer`}
                                    onClick={() => setPage(3)}>
                                    3
                                </div>
                                <div
                                    className={`${
                                        page % 5 === 4 ? "bg-[#b71c1c]" : "bg-[#242d31] hover:bg-[#ffc107]"
                                    } w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer`}
                                    onClick={() => setPage(4)}>
                                    4
                                </div>
                                <div
                                    className={`${
                                        page % 5 === 5 ? "bg-[#b71c1c]" : "bg-[#242d31] hover:bg-[#ffc107]"
                                    } w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer`}
                                    onClick={() => setPage(5)}>
                                    5
                                </div>
                                <div className="w-[40px] h-[40px] flex items-center justify-center mx-[8px] cursor-pointer bg-[#242d31] hover:bg-[#ffc107]">
                                    ...
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalMovie>
                <Footer />
            </div>
        </>
    );
};

export default Genre;

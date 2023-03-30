import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ModalMovie from "../components/ModalMovie";
import MovieSurface from "../components/MovieSurface/MovieSurface";
import Nav from "../components/Nav/Nav";

const ListSearchMovie = () => {
    const { title } = useParams();
    document.title = "Tìm kiếm của " + title;
    const [searchResult, setSearchResult] = useState([]);
    useEffect(() => {
        setSearchResult([]);
        const option1 = {
            method: "GET",
            url: `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${title}/`,
            headers: {
                "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
            },
        };

        const fetchApi = async () => {
            const result = await axios.request(option1);

            await result.data.results.forEach((movie) => {
                const options = {
                    method: "GET",
                    url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movie.imdb_id}/`,
                    headers: {
                        "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                        "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
                    },
                };
                axios
                    .request(options)
                    .then(function (response) {
                        setSearchResult((prev) => [...prev, response.data.results]);
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            });
        };
        fetchApi();
    }, [title]);
    return (
        <>
            <div className={`bg-[#263238] `}>
                <Nav />
                <ModalMovie>
                    <div className="p-[6px] min-h-[100vh]">
                        {/* Title and notice */}
                        <div>
                            <div className="w-full flex items-center justify-between mb-[5px]">
                                <span className="py-[16px] text-[25px] text-[#ff8a00] font-bold uppercase">
                                    {title}
                                </span>
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
                                <a href={`/titlere/${title}`} className="font-bold mr-[6px] text-[#ff8a00]">
                                    {title}
                                </a>
                                mới nhất ,Tổng hợp danh sách các bộ phim hay được web cập nhật liên tục.Tải hơn 10.000
                                bộ phim {title} năm 2022,2023 vietsub, thuyết minh mới nhất, hay nhất
                            </div>
                        </div>
                        {/* Show Movieeee */}
                        <div className="grid lg:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-x-[8px] gap-y-[12px]">
                            {searchResult.map((movie) => (
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
                    </div>
                </ModalMovie>
                <Footer />
            </div>
        </>
    );
};

export default ListSearchMovie;

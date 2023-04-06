import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Link } from "react-router-dom";
import axios from "axios";
import Nav from "../components/Nav/Nav";
import ModalMovie from "../components/ModalMovie";
import Footer from "../components/Footer";
import { ArrowForwardIos, Home, StarBorder } from "@mui/icons-material";
import BannerMovie from "../components/BannerMovie";
import { CircularProgress, Rating } from "@mui/material";
import Comment from "../components/Comment";
import SliderMovie from "../components/SliderMovie";
const SingleMovie = () => {
    const [movie, setMovie] = useState();
    const [connectionMovie, setConnectionMovie] = useState([]);
    const { movieID } = useParams();

    const handleScrollTrailer = () => {
        const trailer = document.getElementById("trailer");
        trailer.scrollIntoView();
    };

    const handleConnectMovie = async (keyword) => {
        const options1 = {
            method: "GET",
            url: `https://moviesminidatabase.p.rapidapi.com/movie/byKeywords/${keyword}/`,
            headers: {
                "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
            },
        };

        const res = await axios
            .request(options1)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.error(error);
            });
        const result = res.results.filter((_, index) => {
            return index < 15 - connectionMovie.length;
        });
        await result.forEach((mov) => {
            const options2 = {
                method: "GET",
                url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${mov.imdb_id}/`,
                headers: {
                    "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                    "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
                },
            };
            axios.request(options2).then(function (response) {
                setConnectionMovie((prev) => [...prev, response.data.results]);
            });
        });
    };
    const handleCheck = (keyw) => {
        if (connectionMovie.length < 15) {
            handleConnectMovie(keyw);
        }
    };
    useEffect(() => {
        const fetchMovie = async () => {
            const options = {
                method: "GET",
                url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${movieID}/`,
                headers: {
                    "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                    "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
                },
            };

            let res = await axios
                .request(options)
                .then(function (response) {
                    setMovie(response.data.results);
                    return response.data.results;
                })
                .catch(function (error) {
                    console.error(error);
                });
            return res;
        };
        const render = async () => {
            let x = await fetchMovie();
            document.title = x.title;
            await handleConnectMovie(x.keywords[0].keyword);
            await handleCheck(x.keywords[1].keyword);
        };
        render();
    }, [movieID]);  

    return (
        <>
            {movie !== undefined ? (
                <>
                    <Nav />
                    <ModalMovie>
                        <>
                            <div className="bg-[#252525] px-[15px] py-[8px] text-[15px] text-[#ff9601] pb-4">
                                <div className="inline-block">
                                    <Link to="/">
                                        <Home sx={{ paddingBottom: "3px", marginRight: "3px", fontSize: "20px" }} />
                                        Xem Phim
                                        <ArrowForwardIos
                                            sx={{
                                                marginLeft: "1px",
                                                marginBottom: "2px",
                                                marginRight: "3px",
                                                fontSize: "12px",
                                            }}
                                        />
                                    </Link>
                                </div>
                                {movie.gen.map((genres) => (
                                    <div className="inline-block" key={genres.id}>
                                        <Link to={`/genre/${genres.genre}`}>
                                            {genres.genre}
                                            <ArrowForwardIos
                                                sx={{
                                                    marginLeft: "1px",
                                                    marginBottom: "2px",
                                                    marginRight: "3px",
                                                    fontSize: "12px",
                                                }}
                                            />
                                        </Link>
                                    </div>
                                ))}
                                <div className="inline-block">
                                    <Link to="/">{movie.title}</Link>
                                </div>
                            </div>
                            <BannerMovie data={movie} event={handleScrollTrailer} />
                            <div className="mt-[10px] mb-[20px] p-[14px] bg-[#252525]">
                                <div className="mt-5 text-white flex items-center">
                                    Đánh giá:
                                    <Rating
                                        defaultValue={movie.rating}
                                        precision={0.5}
                                        max={10}
                                        emptyIcon={<StarBorder sx={{ color: "white" }} />}
                                        sx={{ marginLeft: "9px" }}
                                    />
                                </div>
                                <div className="grid lg:grid-cols-3 grid-cols-1 flex mt-5 pb-[10px] border-b-[1px] border-[#3a3a3a]">
                                    <div className="text-[#fff]">
                                        Thể loại:
                                        {movie.gen.map((genr, index) => (
                                            <div className="inline-block ml-[2px]">
                                                <p className="inline-block text-[#828282] ml-[1px]">{genr.genre}</p>
                                                <p
                                                    className={`text-[#828282] ${
                                                        index === movie.gen.length - 1 ? "hidden" : "inline-block"
                                                    }`}>
                                                    ,
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[#fff]">
                                        Năm Phát Hành: <p className="text-[#828282] inline-block">{movie.year}</p>
                                    </div>
                                    <div className="text-[#fff]">
                                        Thời lượng:{" "}
                                        <p className="text-[#828282] inline-block">{movie.movie_length} phút</p>
                                    </div>
                                    <div className="text-[#fff]">
                                        Điểm IMDb: <p className="text-[#828282] inline-block">{movie.rating}</p>
                                    </div>
                                    <div className="text-[#fff]">
                                        Độ phổ biến: <p className="text-[#828282] inline-block">{movie.popularity}</p>
                                    </div>
                                </div>
                                <div className="mt-[10px] pb-[10px]">
                                    <span className="font-bold text-[20px] text-[#ff9601]">
                                        Nội dung phim và review
                                    </span>
                                    <p className="mt-[15px] text-[14px] text-[#828282]">{movie.description}</p>
                                </div>
                            </div>
                            <div id="trailer" className="border-b-2 border-[#3a3a3a] pb-[30px]">
                                <iframe src={movie.trailer} title={"title"} allowFullScreen width="100%" height="570px">
                                    framebody
                                </iframe>
                            </div>
                        </>
                    </ModalMovie>
                    <Comment />
                    <SliderMovie name={"Có thể bạn cũng muốn xem"} data={connectionMovie} />
                    <Footer />
                </>
            ) : (
                <div className={`w-full h-[100vh] flex items-center justify-center text-[50px]`}>
                    <CircularProgress disableShrink />
                </div>
            )}
        </>
    );
};

export default SingleMovie;

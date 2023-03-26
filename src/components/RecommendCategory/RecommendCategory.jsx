import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames/bind";
import styles from "./RecommendCategory.module.scss";
import MovieSurface from "../MovieSurface/MovieSurface";

const RecommendCategory = ({ data, name }) => {
    const [movies, setMovies] = useState([]);
    const options = {
        method: "GET",
        url: `https://moviesminidatabase.p.rapidapi.com/movie/order/${data}/`,
        headers: {
            "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
            "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
        },
    };
    useEffect(() => {
        const fetchApi = async () => {
            const result = await axios.request(options);
            // eslint-disable-next-line no-lone-blocks
            const result1 = result.data.results.filter((_, index) => {
                return index < 18;
            });
            await result1.forEach((mov) => {
                const options1 = {
                    method: "GET",
                    url: `https://moviesminidatabase.p.rapidapi.com/movie/id/${mov.imdb_id}/`,
                    headers: {
                        "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                        "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
                    },
                };
                axios.request(options1).then(function (response) {
                    setMovies((prev) => [...prev, response.data.results]);
                });
            });
        };
        fetchApi();
        return () => {
            setMovies([]);
        };
    }, []);
    const cx = classNames.bind(styles);
    return (
        <div className="mt-5">
            <p className="text-[25px] text-[#828282] font-[700] uppercase mb-[32px]">{name}</p>
            <div className={cx("list-movie")}>
                {movies.length > 0 &&
                    movies.map((movie) => <MovieSurface to={`/movies/${movie.title}/${movie.imdb_id}`} data={movie} minHeight='270px'/>)}
            </div>
        </div>
    );
};

export default RecommendCategory;

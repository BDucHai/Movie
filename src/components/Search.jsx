import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useDebounce from "../hook/useDebounce";

import { Clear, Loop, Search as SearchIcon } from "@mui/icons-material";
import { Box, Button, Fade, Popper } from "@mui/material";

const Search = () => {
    const inputRef = useRef();
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setOpen(false);
            setSearchResult([]);

            return;
        }
        const option1 = {
            method: "GET",
            url: `https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${debouncedValue}/`,
            headers: {
                "X-RapidAPI-Key": "d013b06efbmsh2c51d6e958c2adap128fa4jsn6ce31ed1f4a6",
                "X-RapidAPI-Host": "moviesminidatabase.p.rapidapi.com",
            },
        };

        const fetchApi = async () => {
            setLoading(true);

            const result = await axios.request(option1);
            const result1 = result.data.results.filter((_, index) => {
                return index < 4;
            });
            result1.forEach((movie) => {
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
        const handler = setTimeout(() => {
            setLoading(false);
            setOpen(true);
        }, 1000);
        return () => clearTimeout(handler);
    }, [debouncedValue]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith(" ")) {
            setSearchValue(value);
        }
    };
    const handleClear = () => {
        setOpen(false);
        const handl = setTimeout(() => {
            setSearchResult([]);
        }, 500);
        clearTimeout(handl);
        setSearchValue("");
        inputRef.current.focus();
    };
    return (
        <>
            <div className="text-white relative flex items-center">
                <input
                    className="bg-[#00000099] border-2 border-[#263238] pl-10 pr-6 py-[6px]"
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search film"
                    spellCheck={false}
                    onChange={handleChange}
                />
                {!!searchValue && !loading && (
                    <button className="absolute right-[26px]" onClick={handleClear}>
                        <Clear />
                    </button>
                )}
                {loading && <Loop className="absolute right-[26px] animate-spin	" />}
                <button className="absolute left-[9px] opacity-[0.8]" onMouseDown={(e) => e.preventDefault()}>
                    <SearchIcon />
                </button>
            </div>
            <Popper open={open} anchorEl={inputRef.current} transition placement="bottom-start">
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            sx={{
                                border: 1,
                                p: 1,
                                bgcolor: "#263238",
                                marginTop: "8px",
                                color: "#999",
                                width: "240px",
                            }}>
                            {searchResult.map((movie, index) => (
                                <Link to={`/movies/${movie.title}/${movie.imdb_id}`}>
                                    <div className={`mb-6 cursor-pointer ${index > 3 ? "hidden" : "flex"}`}>
                                        <img src={movie.image_url} alt="" className="max-h-[70px]" />
                                        <div className="ml-4">
                                            <p>{movie.title}</p>
                                            <p>Rating: {movie.rating}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {searchResult.length > 0 && (
                                <Button variant="contained" sx={{ width: "100%", bgcolor: "red" }}>
                                    Xem them...
                                </Button>
                            )}
                            {searchResult.length === 0 && (
                                <Button variant="contained" sx={{ width: "100%" }}>
                                    Khong co ket qua...
                                </Button>
                            )}
                        </Box>
                    </Fade>
                )}
            </Popper>
        </>
    );
};

export default Search;

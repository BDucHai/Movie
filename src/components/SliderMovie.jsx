import React, { useState, useEffect } from "react";

import MovieSurface from "./MovieSurface/MovieSurface";
import { KeyboardDoubleArrowLeft, KeyboardDoubleArrowRight } from "@mui/icons-material";

const SliderMovie = ({ name, data }) => {
    const [transform, setTransform] = useState(0);
    const widthMovie = -228 * data.length;
    // Handle back next function
    const handleNext = () => {
        if (transform <= widthMovie + 456) {
            setTransform(0);
        } else {
            setTransform((prev) => prev - 228);
        }
    };
    const handleBack = () => {
        if (transform >= 0) {
            setTransform(widthMovie + 456);
        } else {
            setTransform((prev) => prev + 228);
        }
    };
    useEffect(() => {
        const id = setInterval(() => {
            if (transform <= widthMovie + 456) {
                setTransform(0);
            }
            setTransform((prev) => {
                if (prev <= widthMovie + 456) {
                    return 0;
                } else {
                    return prev - 228;
                }
            });
        }, 30000);
        return () => {
            clearInterval(id);
        };
    }, [data]);

    return (
        <>
            <div
                id="contain"
                className="max-w-[1182px] overflow-hidden mx-[auto] bg-[#1a1a1a] pt-[15px] pb-[40px] mb-[40px]">
                <div className="mb-[20px] px-[15px]">
                    <p className="pb-[16px] pt-[26px] border-t-[1px] border-[#4c4c4c] text-[17px] lg:text-[25px] font-bold text-[#ff8a00] uppercase">
                        {name}
                    </p>
                </div>
                <div className="relative">
                    <div className={`flex translate-x-[${transform}px] transition-all`}>
                        {data.map((movie, index) => (
                            <div key={index}>
                                <MovieSurface
                                    to={`/movies/${movie.title}/${movie.imdb_id}`}
                                    data={movie}
                                    width={"180px"}
                                    height={"100px"}
                                    minHeight={"100px"}
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        className="absolute bg-[#000] top-[20px] left-[3px] opacity-[0.75] hover:opacity-[1]"
                        onClick={handleBack}>
                        <KeyboardDoubleArrowLeft
                            sx={{
                                width: "40px",
                                height: "30px",
                                color: "#ff9601",
                                top: "15px",
                                right: "3px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                    <div
                        className="absolute bg-[#000] top-[20px] right-[3px] opacity-[0.75] hover:opacity-[1]"
                        onClick={handleNext}>
                        <KeyboardDoubleArrowRight
                            sx={{
                                width: "40px",
                                height: "30px",
                                color: "#ff9601",
                                top: "15px",
                                right: "3px",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SliderMovie;

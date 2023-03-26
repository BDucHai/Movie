import { ArrowUpward, Facebook, Google, Twitter, YouTube } from "@mui/icons-material";
import React from "react";

import { logo } from "../assets";

const Footer = () => {
    const scrollTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <div className="max-w-[1182px] mx-[auto] py-[20px] px-[30px] bg-[#0f1416] shadow-lg shadow-[#2b496382] grid grid-cols-9 gap-8">
            <div className="md:block hidden col-span-2">
                <img src={logo} alt="" />
                <span className="text-[#30c8c8] text-[20px] font-bold">BMOVIE</span>
            </div>
            <div className="col-span-2">
                <span className="font-bold text-[#ff8a00]">Trợ giúp</span>
                <ul className="text-white mt-3 ml-[6px]">
                    <li className="mb-2 cursor-pointer">Hỏi Đáp</li>
                    <li className="mb-2 cursor-pointer">Liên Hệ</li>
                    <li className="cursor-pointer">Tin tức</li>
                </ul>
            </div>
            <div className="col-span-2">
                <span className="font-bold text-[#ff8a00]">Thông tin</span>
                <ul className="text-white mt-3 ml-[6px]">
                    <li className="mb-2 cursor-pointer">Điều khoản sử dụng</li>
                    <li className="mb-2 cursor-pointer">Chính sách riêng tư</li>
                    <li className="mb-2 cursor-pointer">Khiếu nại bản quyền</li>
                    <li>@Filmchill</li>
                </ul>
            </div>
            <div className="col-span-2">
                <a
                    href="/"
                    className="inline-flex items-center justify-center m-[5px]  w-[2.5rem] h-[2.5rem] leading-[2.5rem] bg-[#1a2327] text-[1.25rem] text-white hover:opacity-[0.6]">
                    <Facebook />
                </a>
                <a
                    href="/"
                    className="inline-flex items-center justify-center m-[5px]  w-[2.5rem] h-[2.5rem] leading-[2.5rem] bg-[#1a2327] text-[1.25rem] text-white hover:opacity-[0.6]">
                    <Twitter />
                </a>
                <a
                    href="/"
                    className="inline-flex items-center justify-center m-[5px]  w-[2.5rem] h-[2.5rem] leading-[2.5rem] bg-[#1a2327] text-[1.25rem] text-white hover:opacity-[0.6]">
                    <Google />
                </a>
                <a
                    href="/"
                    className="inline-flex items-center justify-center m-[5px]  w-[2.5rem] h-[2.5rem] leading-[2.5rem] bg-[#1a2327] text-[1.25rem] text-white hover:opacity-[0.6]">
                    <YouTube />
                </a>
            </div>
            <div className="float-right" onClick={() => scrollTop()}>
                <div className="flex items-center justify-center cursor-pointer bg-[#ffc107] text-white m-[5px]  w-[3rem] h-[3rem] leading-[2.5rem] text-[1.25rem]">
                    <ArrowUpward />
                </div>
            </div>
        </div>
    );
};

export default Footer;

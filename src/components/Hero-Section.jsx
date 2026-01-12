import React, { useEffect, useState } from "react";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import StarIcon from '@mui/icons-material/Star';

const slides = [
  { title: "SMART ACCESSORIES", subtitle: "SAVE ON ELECTRONIC ITEMS" },
  { title: "BEST DEALS", subtitle: "UP TO 50% OFF" },
  { title: "NEW ARRIVALS", subtitle: "SHOP TRENDING ITEMS" },
  { title: "FLASH SALE", subtitle: "HURRY BEFORE IT’S GONE" },
  { title: "HOT DEALS", subtitle: "LIMITED TIME OFFER" },
  { title: "FRESH PICKS", subtitle: "JUST LANDED" },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div
            className="flex-1 relative overflow-hidden rounded-lg h-[380px]"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
                style={{ background: "linear-gradient(90deg,#4b0082,#c71585)" }}
              >
                <div className="flex items-center justify-between h-full px-6 md:px-10">
                  <div className="text-white max-w-[45%]">
                    <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{slide.title}</h1>
                    <p className="text-sm md:text-lg mb-6">{slide.subtitle}</p>
                    <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold">
                      Shop Now
                    </button>
                  </div>
                  <img src={slide.image} alt="" className="h-full object-contain" />
                </div>
              </div>
            ))}

            {hover && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center hover:bg-black/70 transition"
                >
                  ‹
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-12 h-12 rounded-full text-2xl flex items-center justify-center hover:bg-black/70 transition"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    current === i ? "bg-white" : "bg-white/50"
                  }`}
                ></span>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[220px] bg-[#fff5ef] rounded-lg p-3 flex flex-col justify-between">
            <div className="bg-gradient-to-b from-orange-400 to-pink-500 text-white p-3 rounded-md">
              <p className="text-sm font-semibold">TRY DARAZ APP</p>
              <p className="text-xs mt-1">Download the App now</p>
              <div className="bg-white text-black mt-3 p-2 rounded text-xs flex items-center gap-1">
                <StarIcon fontSize="small" className="text-yellow-400" />
                4.8 Rated
              </div>
            </div>

            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2"><LocalShippingIcon fontSize="small" /> Free Shipping</li>
              <li className="flex items-center gap-2"><ConfirmationNumberIcon fontSize="small" /> Exclusive Vouchers</li>
              <li className="flex items-center gap-2"><WhatshotIcon fontSize="small" /> Sales</li>
              <li className="flex items-center gap-2"><MonetizationOnIcon fontSize="small" /> 50% Discount</li>
              <li className="flex items-center gap-2"><HourglassBottomIcon fontSize="small" /> Limited Offers</li>
            </ul>

            <img src="/assets/app.png" alt="" className="w-full mt-3 cursor-pointer" />
          </div>
        </div>

        <div className="mt-6 w-full flex justify-center">
          <div className="w-full md:w-[1150px] rounded-lg overflow-hidden cursor-pointer relative">
            <div
              className="w-full h-[100px] flex items-center justify-between px-6 md:px-10"
              style={{ background: "linear-gradient(90deg, #4b0082, #c71585)" }}
            >
              <div className="text-white">
                <h2 className="text-xl md:text-2xl font-extrabold">UP TO 50% OFF</h2>
                <p className="text-sm md:text-lg mt-1">LIMITED TIME OFFER - SHOP NOW!</p>
              </div>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

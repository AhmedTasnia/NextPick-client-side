import React, { useContext } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Typewriter } from "react-simple-typewriter";
import { useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider"; // ⬅️ Adjust path if needed

const bannerSlides = [
  {
    title: "Top Picks of 2025",
    subtitle: (
      <>
        Discover the highest-rated products of the year, selected by our expert reviewers<br />
        and trusted users. Find out what made them stand out in quality, value, and performance. 🌟
      </>
    ),
    image: "https://i.postimg.cc/2yHfwL5b/ai-generated-natural-skincare-products-top-view-with-mockup-space-photo.jpg",
  },
  {
    title: "Real Reviews. Real People.",
    subtitle: (
      <>
        Get honest feedback from real users who tested and used these products.<br />
        No paid promotions—just pure, unfiltered opinions from the community. 💬
      </>
    ),
    image: "https://i.postimg.cc/3JcT0G6z/cosmetics-composition-with-serum-bottles-23-2148549119.avif",
  },
  {
    title: "Compare Before You Buy",
    subtitle: (
      <>
        Not sure which product to choose? Use our side-by-side comparisons<br />
        to evaluate features, prices, ratings, and user satisfaction. 📊
      </>
    ),
    image: "https://i.postimg.cc/8CGn7P1q/harmful-products-hero.jpg",
  },
];

const Banner = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddQueryClick = () => {
    if (user) {
      navigate("/AddQueries");
    } else {
      navigate("/auth/login");
    }
  };

  return (
    <div className="w-full noto-serif-Regular">
      <Fade arrows={false} autoplay={true} duration={5000} pauseOnHover={false}>
        {bannerSlides.map((slide, index) => (
          <div
            key={index}
            className="relative h-[75vh] bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40 dark:bg-black/60"></div>
            <div className="relative z-10 text-center text-white px-6">
              <h1 className="text-4xl md:text-6xl noto-serif-Bold mb-4 drop-shadow-lg">
                <Typewriter
                  key={index}
                  words={[slide.title]}
                  loop={1}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h1>
              <p className="text-lg md:text-2xl fira-sans-medium drop-shadow-md">
                {slide.subtitle}
              </p>
              <button
                onClick={handleAddQueryClick}
                className="mt-6 px-6 py-3 font-fira-sans-semibold bg-[#333446] text-white hover:bg-[#7F8CAA] hover:text-black border-2 transition rounded-full shadow"
              >
                Add a Query
              </button>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Banner;

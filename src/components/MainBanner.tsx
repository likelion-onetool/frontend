import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

const BannerWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;

const TestBanner = styled(motion.div)<{ bgImage: string }>`
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: center;
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  cursor: pointer;

  p {
    margin-left: 64px;
  }

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;

const PrevBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  top: 16px;
`;

const NextBtn = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  bottom: 16px;
`;

const variants = {
  enter: {
    opacity: 0,
    scale: 0.9,
    zIndex: 0,
  },
  center: {
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    zIndex: 0,
  },
};

const MainBanner = () => {
  const images = [
    "/kintexbanner1.jpg", // Replace with actual paths to your images
    "/kintexbanner2.jpg",
    "/kintexbanner3.jpg",
  ];
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [index, isHovered, images.length]);

  const handleNext = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLeaving) {
      return;
    }
    toggleLeaving();
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    if (isLeaving) {
      return;
    }
    toggleLeaving();
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const toggleLeaving = () => setIsLeaving((prev) => !prev);

  return (
    <BannerWrapper>
      <Link to={"/items/11"}>
        <AnimatePresence
          initial={false}
          custom={index}
          onExitComplete={() => setIsLeaving(false)}
        >
          <TestBanner
            key={index}
            custom={index}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7 }}
            bgImage={images[index]} // Use bgImage instead of bgColor
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <p>무료 CAD 소스가 이렇게 좋다고?</p>
            <p>킨텍스 도면 보러가기</p>

            <NextBtn>
              <button onClick={handleNext}>
                <IoIosArrowDown />
              </button>
            </NextBtn>
            <PrevBtn>
              <button onClick={handlePrev}>
                <IoIosArrowUp />
              </button>
            </PrevBtn>
          </TestBanner>
        </AnimatePresence>
      </Link>
    </BannerWrapper>
  );
};

export default MainBanner;

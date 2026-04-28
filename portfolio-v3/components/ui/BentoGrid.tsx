'use client';
import { cn } from "@/utils/cn";
import { BackgroundGradientAnimation } from "./GradientBg";
import Grid from "../Grid";
import GridGlobe from "./GridGlobe";
import { Globe } from "./Globe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from '@/data/confetti.json';
import MagicBtn from "./MagicBtn";
import { IoCopy, IoCopyOutline } from "react-icons/io5";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid grid-cols-1 gap-4 md:grid-row-7 md:grid-cols-6 lg:grid-cols-5 lg:gap-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  id,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  id?: number;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const [copied, setcopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText('kellogilee@gmail.com');
    setcopied(true); 
  }

  return (
    <div
      className={cn(
        "group/bento shadow-input row-span-1 overflow-hidden flex flex-col justify-between relative space-y-4 rounded-3xl border border-white[0.1] transition duration-200 hover:shadow-xl dark:shadow-none",
        className
      )}
      style={{
        background: '#020024',
        backgroundColor: 'linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(3, 8, 8, 1) 100%)',
      }}
    >
      <div className={`${id === 6 && 'flex justify-center h-full'}`}>
        <div className="w-full h-full absolute">
          {img && (
            <img 
              src={img}
              alt={img}
              className={cn(imgClassName, 'object-cover object-center')}
            />
          )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
          {spareImg && (
            <img 
              src={spareImg}
              alt={spareImg}
              className={'object-cover object-center w-full h-full'}
            />
          )}
        </div>
        <div>
          {id === 6 && (
            <BackgroundGradientAnimation>
              {/*<div className="absolute z-50 felx items-center justify-center text-white font-bold"/>*/}
            </BackgroundGradientAnimation>
          )}
          <div className={cn(titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 position-relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10')}>
            <div className="mt-2 mb-2 font-sans font-extralight text-[#c1c2d3] text-sm md:text-xs lg:text-base z-10">
              {description}
            </div>
            <div
            className={`font-sans text-lg lg:text-3xl max-w-96 font-bold z-10`}
            >
            {title}
          </div>

          {id === 2 && <GridGlobe />}
          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2 bottom-0">
              <div className="flex flex-col gap-3">
                {['React.js', 'Next.js', 'TypeScript'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
              </div>
    
               <div className="flex flex-col gap-3">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
                {['React Native', 'JavaScript', 'Firebase'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie options={{
                  loop: copied,
                  autoplay: false,
                  animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  }
                }}/>
              </div>

              <MagicBtn 
                title={copied ? 'E-mail Copied!' : 'Copy E-mail'}
                icon={<IoCopyOutline/>}
                position="left"
                otherClasses="!bg-[#161a31]"
                handleClick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";

import { InnerPanel } from "components/ui/Panel";
import { Button } from "components/ui/Button";

import arrowLeft from "assets/icons/arrow_left.png";
import whiteBorder from "assets/ui/panel/white_border.png";

// TODO - get tips from a better datasource
import tips from "public/tips.json";

const MAX_FAQ_HEIGHT = 90;
const FAQ_SLIDESHOW_INTERVAL = 5000; // 5 seconds

export const Tips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);
  const [doSlideshow, setDoSlideshow] = useState<boolean>(true);

  // Allow the player to manually click through tips
  const handleArrowButtonClick = (direction: "left" | "right") => {
    setDoSlideshow(false);
    let newIndex =
      direction === "right" ? currentTipIndex + 1 : currentTipIndex - 1;
    if (newIndex < 0) {
      newIndex = tips.length - 1;
    }
    setCurrentTipIndex(newIndex % tips.length);
  };

  const handleSlideshowStopEvent = () => setDoSlideshow(false);

  // Auto slideshow FAQs
  useEffect(() => {
    if (!doSlideshow) {
      // Stop the slideshow whenever player clicks one of the arrows
      return;
    }
    const timer = setInterval(() => {
      setCurrentTipIndex((currentTipIndex + 1) % tips.length);
    }, FAQ_SLIDESHOW_INTERVAL);
    return () => {
      clearInterval(timer);
    };
  }, [currentTipIndex, doSlideshow]);

  const { tip, link } = tips[currentTipIndex];

  if (!tips || !tips.length) {
    return null;
  }

  return (
    <div className="relative">
      <Button
        // className="w-auto h-10 px-4 mr-0.5 bg-silver-300"
        // style={{ border: "none", backgroundColor: "transparent" }}
        className="absolute left-0 bottom-1/2 bg-transparent block"
        style={{ border: "none" }}
        onClick={() => handleArrowButtonClick("left")}
      >
        <img src={arrowLeft} className="scale-[2] block" />
      </Button>
      <InnerPanel
        className="bg-white/75 p-2 mx-6"
        style={{
          textShadow: "none",
          borderImage: `url(${whiteBorder}) 30 stretch`,
          borderWidth: 5,
        }}
      >
        {/* <h2 className="text-white p-1.5">Did you know?</h2> */}

        <div className="relative">
          <div
            style={{ maxHeight: MAX_FAQ_HEIGHT }}
            className="overflow-y-auto scrollable"
            onClick={handleSlideshowStopEvent}
          >
            {/* Good for mobile to stop slideshow if tip text is pressed */}
            <p className="text-black text-xxs sm:text-xs px-1">{tip}</p>
          </div>
          <a
            onMouseEnter={handleSlideshowStopEvent}
            className="block underline text-black text-center pt-1"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-xxs sm:text-xs">Learn More</span>
          </a>
        </div>
      </InnerPanel>
      {/* <Button
        className="w-auto h-10 px-4 mr-0.5 bg-silver-300"
        style={{ border: "none", backgroundColor: "transparent" }}
        onClick={() => handleArrowButtonClick("right")}
      >
        <img src={arrowRight} className="scale-[2]" />
      </Button> */}
      {/* <div className="flex justify-end py-1"> */}
      {/* <a
          onMouseEnter={handleSlideshowStopEvent}
          className={classNames(
            buttonClasses,
            "flex-1 w-auto h-10 px-4 mr-0.5 bg-silver-300"
          )}
          style={{
            ...buttonStyles,
            borderImage: `url(${whiteBorder}) 30 stretch`,
          }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Learn More</span>
        </a> */}
      {/* <Button
            className="w-auto h-10 px-4 mr-0.5 bg-silver-300"
            onClick={() => handleArrowButtonClick("left")}
          >
            <img src={arrowLeft} />
          </Button> */}
      {/* <Button
          className="w-auto h-10 px-2 mr-0.5 bg-silver-300"
          style={{
            borderImage: `url(${whiteBorder}) 30 stretch`,
          }}
          onClick={() => handleArrowButtonClick("right")}
        >
          <span className="pr-2">Next</span>
          <img src={arrowRight} />
        </Button> */}
      {/* </div> */}
    </div>
  );
};

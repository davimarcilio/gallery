import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, useEffect, useState } from "react";
import { images } from "@/data/images";
import Image from "next/image";
import { Arrow } from "./components/Arrow";
export function Carrousel() {
  function ThumbnailPlugin(
    mainRef: MutableRefObject<KeenSliderInstance | null>
  ): KeenSliderPlugin {
    return (slider) => {
      function removeActive() {
        slider.slides.forEach((slide) => {
          slide.classList.remove("active");
        });
      }
      function addActive(idx: number) {
        slider.slides[idx].classList.add("active");
      }

      function addClickEvents() {
        slider.slides.forEach((slide, idx) => {
          slide.addEventListener("click", () => {
            if (mainRef.current) mainRef.current.moveToIdx(idx);
          });
        });
      }

      slider.on("created", () => {
        if (!mainRef.current) return;
        addActive(slider.track.details.rel);
        addClickEvents();
        mainRef.current.on("animationStarted", (main) => {
          removeActive();
          const next = main.animator.targetIdx || 0;
          addActive(main.track.absToRel(next));
          slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
        });
      });
    };
  }
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );
  useEffect(() => {
    setTimeout(() => {
      instanceRef.current?.update();
    }, 100);
  }, []);
  return (
    <section className="flex flex-col justify-center mb-10 items-center  relative w-full">
      <div className="max-w-screen-md relative">
        <div ref={sliderRef} className={"keen-slider"}>
          {images.map((image) => (
            <Image
              key={image.id}
              className="keen-slider__slide w-full cursor-pointer hover:opacity-75 transition-opacity rounded"
              src={image.url}
              alt={image.name}
              width={1000}
              height={500}
            />
          ))}
        </div>
        <div ref={thumbnailRef} className="keen-slider mt-5 thumbnail">
          {images.map((image) => (
            <Image
              key={image.id}
              className="keen-slider__slide cursor-pointer hover:opacity-75 transition-opacity rounded"
              src={image.url}
              alt={image.name}
              width={250}
              height={250}
            />
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              disabled={currentSlide === 0}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              isLeft={true}
            />
            <Arrow
              disabled={currentSlide === 4}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              isLeft={false}
            />
          </>
        )}
      </div>
    </section>
  );
}

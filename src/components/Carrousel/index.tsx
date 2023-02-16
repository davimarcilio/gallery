import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Arrow } from "./components/Arrow";
import { UserContext } from "@/context/UserContext";
import { Modal } from "../List/components/Modal";
import { Button } from "../Button";
export function Carrousel() {
  const { galery } = useContext(UserContext);

  if (galery.length === 0) {
    return (
      <section className="flex text-3xl font-bold mt-10 flex-col justify-center max-sm:justify-start items-center max-sm:overflow-scroll relative w-full max-sm:h-screen max-sm:px-5">
        <h1>
          Opa, Você não possui nenhuma imagem no momento, experimente adicionar
          uma!
        </h1>
        <Modal type="Form" title="Upload">
          <Button className="bg-blue mt-5 text-white mr-20">
            Upload de Imagem
          </Button>
        </Modal>
      </section>
    );
  }

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
    }, 200);
  }, []);
  return (
    <section className="flex flex-col justify-center mb-10 items-center  relative w-full">
      <div className="max-w-screen-md relative max-sm:px-2">
        <div ref={sliderRef} className={"keen-slider"}>
          {galery.map((image) => (
            <Image
              key={image.id}
              className="keen-slider__slide max-sm:object-fill max-sm:w-10 w-full cursor-pointer hover:opacity-75 transition-opacity rounded"
              src={image.src}
              alt={image.name}
              width={1000}
              height={500}
            />
          ))}
        </div>
        <div
          ref={thumbnailRef}
          className="keen-slider mt-5 thumbnail max-sm:hidden"
        >
          {galery.map((image) => (
            <Image
              key={image.id}
              className="keen-slider__slide max-sm:hidden cursor-pointer hover:opacity-75 transition-opacity rounded"
              src={image.src}
              alt={image.name}
              width={250}
              height={250}
            />
          ))}
        </div>
        {loaded && instanceRef.current && (
          <>
            <Arrow
              className="max-sm:hidden"
              disabled={currentSlide === 0}
              onClick={(e: any) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              isLeft={true}
            />
            <Arrow
              className="max-sm:hidden"
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

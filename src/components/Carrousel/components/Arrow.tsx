import { CaretLeft, CaretRight } from "phosphor-react";
import { ComponentProps } from "react";

interface ArrowProps extends ComponentProps<typeof CaretRight> {
  isLeft?: boolean;
  disabled: boolean;
}

export function Arrow({ isLeft, ...props }: ArrowProps) {
  return (
    <>
      {isLeft ? (
        <CaretLeft
          size={50}
          className={`cursor-pointer absolute top-1/2 -translate-y-1/2 -left-10 transition-opacity ${
            props.disabled ? "text-gray cursor-not-allowed" : "hover:opacity-70"
          }`}
          {...props}
        />
      ) : (
        <CaretRight
          size={50}
          className={`cursor-pointer absolute top-1/2 -translate-y-1/2 -right-10 transition-opacity ${
            props.disabled ? "text-gray cursor-not-allowed" : "hover:opacity-70"
          }`}
          {...props}
        />
      )}
    </>
  );
}

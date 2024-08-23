import {
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
  type ForwardedRef,
  type FC,
  type MouseEventHandler,
  type HTMLAttributes,
} from "react";
import classnames from "classnames";
import { useHorizontalScroll } from "../../hooks/horizontal_scroll";

interface SwipperProps extends HTMLAttributes<HTMLDivElement> {
  direction: "horizontal" | "vertical" | "both";
}

const Swipper = forwardRef<HTMLDivElement, SwipperProps>(function Swipper(
  { children, direction = "horizontal", ...restProps },
  ref,
) {
  const [isMouseDown, changeMouseDown] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>();
  const lastCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useImperativeHandle(ref, () => {
    return containerRef.current as HTMLDivElement;
  });

  const handleMouseDown: MouseEventHandler = (ev) => {
    const { clientX, clientY } = ev;

    lastCoords.current.x = clientX;
    lastCoords.current.y = clientY;

    changeMouseDown(true);
  };

  const handleMouseUp: MouseEventHandler = (ev) => {
    changeMouseDown(false);

    // reset the coords values
    lastCoords.current.x = 0;
    lastCoords.current.y = 0;
  };

  const handleMouseMove: MouseEventHandler = (ev) => {
    if (isMouseDown && containerRef.current) {
      const { clientX, clientY } = ev;

      const xDiff = lastCoords.current.x - clientX;
      const yDiff = lastCoords.current.y - clientY;

      if (direction === "horizontal" || direction === "both")
        containerRef.current.scrollLeft = Math.min(
          containerRef.current.scrollWidth,
          Math.max(0, containerRef.current.scrollLeft + xDiff),
        );

      if (direction === "vertical" || direction === "both")
        containerRef.current.scrollTop = Math.min(
          containerRef.current.scrollHeight,
          Math.max(0, containerRef.current.scrollTop + yDiff),
        );

      lastCoords.current.x = clientX;
      lastCoords.current.y = clientY;
    }
  };

  // Use the horizontal scrolling with scroll wheel
  useHorizontalScroll(containerRef);

  return (
    <div
      {...restProps}
      ref={containerRef}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      className={classnames(
        restProps.className,
        "select-none",
        isMouseDown ? "cursor-grabbing" : "cursor-grab",
      )}
    >
      {children}
    </div>
  );
});

export default Swipper;

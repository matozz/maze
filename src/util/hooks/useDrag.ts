import { useEffect, useState } from "react";

export const useDrag = (parser: Function) => {
  const [isDrag, setIsDrag] = useState(false);
  const [change, setChange] = useState<any>({});

  const handleDragMove = (
    e: MouseEvent | TouchEvent | React.TouchEvent | React.MouseEvent
  ) => {
    parser(e) && setChange(parser(e));
    // change && typeof onChange === "function" && onChange(change, e);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDrag) return;
    setIsDrag(true);
    handleDragMove(e);
  };

  const handleDragStop = () => {
    if (!isDrag) return;
    setIsDrag(false);
  };

  useEffect(() => {
    if (isDrag) {
      document.addEventListener("mousemove", handleDragMove);
      document.addEventListener("mouseup", handleDragStop);
      document.addEventListener("touchmove", handleDragMove);
      document.addEventListener("touchend", handleDragStop);
      return () => {
        document.removeEventListener("mousemove", handleDragMove);
        document.removeEventListener("mouseup", handleDragStop);
        document.removeEventListener("touchmove", handleDragMove);
        document.removeEventListener("touchend", handleDragStop);
      };
    }
    return () => {};
  }, [isDrag]);

  return { handleDragStart, change };
};

import { PropsWithChildren } from "react";
import { MenuItem } from "./Menu";
import { LayeredText } from "../common/LayeredText";

type BottomSheetProps = {
  title: string;
  openList: MenuItem | undefined;
  onClose: () => void;
}

export const BottomSheet: React.FC<PropsWithChildren<BottomSheetProps>> = ({
  title,
  openList,
  onClose,
  children
}) => {
  const mainContainer = (openList === title)
    ? "fixed bottom-0 left-0 right-0 h-1/2 bg-gray-800 transition-transform duration-300 ease-in-out z-90"
    : "fixed bottom-0 left-0 right-0 h-1/2 bg-gray-800 transition-transform duration-300 ease-in-out transform translate-y-full z-90";
  const backdrop = (openList === title)
    ? "fixed top-0 left-0 w-screen h-screen transition-opacity duration-300 ease-in-out bg-slate-950 opacity-80 z-80"
    : "fixed top-0 left-0 w-screen h-screen transition-opacity duration-300 ease-in-out bg-slate-950 opacity-0 -z-10";

  return (
    <>
      <div className={backdrop}></div>
      <div className={mainContainer}>
        <div className="flex flex-row justify-between transition p-2">
          <LayeredText text={title} fontSize="26px" />
          <div className="flex flex-row gap-2 z">
            <button onClick={onClose}>
              <LayeredText text="X" fontSize="26px" />
            </button>
          </div>
        </div>
        { children }
      </div>
    </>
  );
}
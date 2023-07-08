import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { LayeredText } from "../common/LayeredText";
import { MenuItem } from "./Menu";


type ExpansionListProps = {
  title: MenuItem;
  openList: MenuItem | undefined;
  onOpen: (title: MenuItem) => void;
  onClose: () => void;
}

export const ExpansionList: React.FC<PropsWithChildren<ExpansionListProps>> = ({ title, openList, onOpen, onClose, children }) => {
  const isOpen = openList === title;

  const handleToggle = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen(title);
    }
  };

  return (
    <div className="bg-slate-700 border-slate-400 border-4 p-2">
      <div onClick={handleToggle} className="px-2 flex flex-row justify-between cursor-pointer">
        <LayeredText fontSize="24px" text={title} />
        <LayeredText fontSize="24px" text={isOpen ? '-' : '+'} />
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <AnimatePresence>{ children }</AnimatePresence>
      </motion.div>
    </div>
  );
};
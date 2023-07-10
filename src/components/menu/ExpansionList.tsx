import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { MenuItem } from "./Menu";
import { useThemeContext } from "../../contexts/themeContext";

type ExpansionListProps = {
  title: MenuItem;
  openList: MenuItem | undefined;
  onOpen: (title: MenuItem) => void;
  onClose: () => void;
}

export const ExpansionList: React.FC<PropsWithChildren<ExpansionListProps>> = ({ title, openList, onOpen, onClose, children }) => {
  const isOpen = openList === title;
  const { uiTheme } = useThemeContext();

  const handleToggle = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen(title);
    }
  };

  return (
    <div style={{ backgroundColor: uiTheme.dark, borderColor: uiTheme.light }} className="border-4 p-2">
      <div onClick={handleToggle} className="px-2 flex flex-row justify-between cursor-pointer font-futile-pro text-xl font-black">
        <h2>{ title }</h2>
        <span>{ isOpen ? '-' : '+' }</span>
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
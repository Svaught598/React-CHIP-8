import { PaletteList } from "./PaletteList";
import { RomList } from "./RomList";
import { ExpansionList } from "./ExpansionList";
import { useState } from "react";
import { Button } from "../common/Button";
import { useEmulationContext } from "../../contexts/emulationContext";
import { CLASSIC_THEME, DEFAULT_THEMES } from "../../constants";
import { PaletteMaker } from "../PaletteMaker";
import { useThemeContext } from "../../contexts/themeContext";
import { AnimatePresence, motion } from "framer-motion";

export type MenuItem = 
  | 'Palettes'
  | 'Custom Palettes'
  | 'Games';

export const Menu: React.FC = () => {
  const [openList, setOpenList] = useState<MenuItem | undefined>();
  const [openPaletteGenerator, setOpenPaletteGenerator] = useState<boolean>(false); 
  const { paused, setPaused } = useEmulationContext();
  const { customThemes = [] } = useThemeContext();


  return (
    <section className="flex flex-col gap-2 w-full">
      <div className="flex flex-row justify-between md:block">
        <Button
          text={ paused ? "Resume" : 'Pause Emulator' }
          onClick={() => setPaused(isPaused => !isPaused)} 
          theme={ CLASSIC_THEME } 
        />

        <Button
          text="Create Palette"
          onClick={ () => setOpenPaletteGenerator(true) } 
          theme={ CLASSIC_THEME } 
        />
      </div>

      <ExpansionList
        title="Palettes"
        openList={openList}
        onClose={() => setOpenList(undefined)}
        onOpen={(title) => setOpenList(title)}
      >
        <PaletteList onSelect={() => setOpenList(undefined)} themes={DEFAULT_THEMES}/>
      </ExpansionList>
      { (customThemes.length > 0) &&
        <ExpansionList
          title="Custom Palettes"
          openList={openList}
          onClose={() => setOpenList(undefined)}
          onOpen={(title) => setOpenList(title)}
        >
          <PaletteList onSelect={() => setOpenList(undefined)} themes={customThemes}/>
        </ExpansionList>
      } 
      <ExpansionList 
        title="Games" 
        openList={openList} 
        onClose={() => setOpenList(undefined)}
        onOpen={(title) => setOpenList(title)}
      >
        <RomList onSelect={() => setOpenList(undefined)} />
      </ExpansionList>

      <AnimatePresence>
        { openPaletteGenerator && 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <PaletteMaker closeModal={() => setOpenPaletteGenerator(false)} /> 
          </motion.div>
        }
      </AnimatePresence>
    </section>
  );
}
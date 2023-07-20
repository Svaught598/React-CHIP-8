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
import { GameControllerIcon, ListIcon, PauseIcon, PlayIcon, PlusIcon, RedoIcon } from "../icons/";
import { BottomSheet } from "./BottomSheet";
import { emulatorState } from "../../core/core";

export type MenuItem = 
  | 'Palettes'
  | 'Custom Palettes'
  | 'Games';

export const Menu: React.FC = () => {
  const [openList, setOpenList] = useState<MenuItem | undefined>();
  const [openPaletteGenerator, setOpenPaletteGenerator] = useState<boolean>(false); 
  const { paused, setPaused, setRom } = useEmulationContext();
  const { customThemes = [], uiTheme } = useThemeContext();
  const buttonStyles = {
    backgroundColor: uiTheme.dark,
    borderColor: uiTheme.light,
  }

  const resetRom = () => {
    setRom(undefined);
    setTimeout(() => setRom(emulatorState.meta.romName), 0);
  }

  return (
    <>
      <section className="hidden md:flex md:flex-col md:gap-2">
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
      </section>

      <section className="flex flex-row gap-2 md:hidden justify-between items-center mx-4">
        <div className="flex flex-row gap-3">
          <button className="p-2 border-4" style={buttonStyles} onClick={ () => resetRom() }>
            <RedoIcon />
          </button>
          <button className="p-2 border-4" style={buttonStyles} onClick={ () => setPaused(p => !p) }>
            { paused && <PlayIcon /> || <PauseIcon /> }
          </button>
        </div>

        <div className="flex flex-row gap-3">
          <button className="p-2 border-4" style={buttonStyles} onClick={ () => setOpenList(title => title === "Games" ? undefined : 'Games') }>
            <GameControllerIcon />
          </button>
          <button className="p-2 border-4" style={buttonStyles} onClick={ () => setOpenList(title => title === "Palettes" ? undefined : 'Palettes') }>
            <ListIcon />
          </button>
          <button className="p-2 border-4" style={buttonStyles} onClick={ () => setOpenPaletteGenerator(true) }>
            <PlusIcon />
          </button>
        </div>

        <BottomSheet
          title="Games"
          openList={openList}
          onClose={() => setOpenList(undefined)}
        >
          <RomList onSelect={() => setOpenList(undefined)} />
        </BottomSheet>
        <BottomSheet
          title="Palettes"
          openList={openList}
          onClose={() => setOpenList(undefined)}
        >
          <PaletteList onSelect={() => setOpenList(undefined)} themes={customThemes.concat(DEFAULT_THEMES)} />
        </BottomSheet>
      </section>

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
    </>
  );
}
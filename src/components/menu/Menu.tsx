import { PaletteList } from "./PaletteList";
import { RomList } from "./RomList";
import { ExpansionList } from "./ExpansionList";
import { useState } from "react";
import { Button } from "../common/Button";
import { useEmulationContext } from "../../contexts/emulationContext";
import { CLASSIC_THEME } from "../../constants";

export type MenuItem = 
  | 'Palettes'
  | 'Games';

export const Menu: React.FC = () => {
  const [openList, setOpenList] = useState<MenuItem | undefined>();
  const { emulatorState, togglePaused  } = useEmulationContext();
  const isPaused = emulatorState.paused;

  return (
    <section className="flex flex-col gap-2 w-full">
      <Button
        text={isPaused ? "Resume" : 'Pause Emulator'}
        onClick={() => togglePaused(isPaused => !isPaused)} 
        theme={CLASSIC_THEME} 
      />

      <ExpansionList
        title="Palettes"
        openList={openList}
        onClose={() => setOpenList(undefined)}
        onOpen={(title) => setOpenList(title)}
      >
        <PaletteList />
      </ExpansionList>
      <ExpansionList 
        title="Games" 
        openList={openList} 
        onClose={() => setOpenList(undefined)}
        onOpen={(title) => setOpenList(title)}
      >
        <RomList />
      </ExpansionList>
    </section>
  );
}
import { FC, useRef, useState } from "react";
import { useEmulationContext } from "../../contexts/emulationContext";
import { Button } from "../common/Button";
import { CLASSIC_THEME, ROM_LIST } from "../../constants";
import { Game } from "../../types";

type RomListProps = {
  onSelect: () => void;
}

export const RomList: FC<RomListProps> = ({ onSelect }) => {
  const [selectedRom, setSelectedRom] = useState<Game>();
  const { setRom: loadRom, setPaused } = useEmulationContext();
  const selector = useRef<HTMLSelectElement>(null);

  const selectRom = async (rom: Game) => {
    setSelectedRom(rom);
    onSelect();
    try {
      loadRom(rom);
      selector.current?.blur();
      setPaused(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="h-96 overflow-y-auto flex flex-col gap-2 pr-2 pb-4">     
        {
          ROM_LIST.map((game) => 
            <Button
              key={game.name}
              text={game.name}
              theme={CLASSIC_THEME}
              selected={selectedRom?.name === game.name}
              onClick={() => selectRom(game)}
            />
          )
        }
      </div>
    </>
  );
}
import { FC, useRef, useState } from "react";
import { useEmulationContext } from "../../contexts/emulationContext";
import { Button } from "../common/Button";
import { CLASSIC_THEME, ROM_LIST } from "../../constants";

type RomListProps = {
  onSelect: () => void;
}

export const RomList: FC<RomListProps> = ({ onSelect }) => {
  const [rom, setRom] = useState<string>();
  const { setRom: loadRom, setPaused } = useEmulationContext();
  const selector = useRef<HTMLSelectElement>(null);

  const selectRom = async (romName: string) => {
    setRom(romName);
    onSelect();
    try {
      loadRom(romName);
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
              selected={rom === game.name}
              onClick={() => selectRom(game.name)}
            />
          )
        }
      </div>
    </>
  );
}
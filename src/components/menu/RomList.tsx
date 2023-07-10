import { FC, useRef, useState } from "react";
import { useEmulationContext } from "../../contexts/emulationContext";
import { Button } from "../common/Button";
import { CLASSIC_THEME, ROM_LIST } from "../../constants";



export const RomList: FC = () => {
  const [rom, setRom] = useState<typeof ROM_LIST[number]>();
  const { setRom: loadRom } = useEmulationContext();
  const selector = useRef<HTMLSelectElement>(null);

  const selectRom = async (romName: typeof ROM_LIST[number]) => {
    setRom(romName);
    try {
      const romResponse = await fetch(`./roms/${romName}`);
      const romDataRaw = await romResponse.arrayBuffer();
      const romData = Array.from(new Uint8Array(romDataRaw));
      loadRom(romData);
      selector.current?.blur();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="h-96 overflow-y-auto flex flex-col gap-2 pr-2">     
        {
          ROM_LIST.map((romName) => 
            <Button
              key={romName}
              text={romName}
              theme={CLASSIC_THEME}
              selected={rom === romName}
              onClick={() => selectRom(romName)}
            />
          )
        }
      </div>
    </>
  );
}
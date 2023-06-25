import { ChangeEvent, FC, useRef, useState } from "react";
import { useEmulationContext } from "../contexts/emulationContext";

const ROM_LIST = [
  "TEST",
  "TEST_FLAGS",
  "15PUZZLE",
  "BLINKY",
  "BLITZ",
  "BRIX",
  "CONNECT4",
  "GUESS",
  "HIDDEN",
  "INVADERS",
  "KALEID",
  "list.txt",
  "MAZE",
  "MERLIN",
  "MISSILE",
  "PONG",
  "PONG2",
  "PUZZLE",
  "SYZYGY",
  "TANK",
  "TETRIS",
  "TICTAC",
  "UFO",
  "VBRIX",
  "VERS",
  "WIPEOFF",
] as const;

export const RomSelector: FC = () => {
  const [rom, setRom] = useState<typeof ROM_LIST[number]>();
  const { loadRom } = useEmulationContext();

  const selectRom = async (event: ChangeEvent) => {
    const selectElement = event.target as HTMLSelectElement;
    const romName = selectElement.value as typeof ROM_LIST[number];
    setRom(romName);
    try {
      const romResponse = await fetch(`./roms/${romName}`);
      const romDataRaw = await romResponse.arrayBuffer();
      const romData = Array.from(new Uint8Array(romDataRaw));
      loadRom(romData);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <label>Select Rom</label>
      <select value={rom} onChange={selectRom} className="flex flex-row justify-evenly w-full my-2">
        {
          ROM_LIST.map((romName) => (
            <option
              key={romName}
              className="bg-zinc-700 py-2 px-8 rounded-md"
              value={romName}
            >
              { romName }
            </option>
          ))
        }
      </select>
    </>
  );
}
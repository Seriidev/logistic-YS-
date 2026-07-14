import {
  LuBattery,
  LuBiohazard,
  LuBomb,
  LuCrosshair,
  LuFlame,
  LuLandmark,
  LuPill,
  LuRadiation,
  LuSnowflake,
  LuThermometer,
} from "react-icons/lu";

export const PROHIBITED = [
  { id: 1, titleKey: "items.explosives", Icon: LuBomb },
  { id: 2, titleKey: "items.firearms", Icon: LuCrosshair },
  { id: 3, titleKey: "items.flammable", Icon: LuFlame },
  { id: 4, titleKey: "items.toxic", Icon: LuBiohazard },
  { id: 5, titleKey: "items.radioactive", Icon: LuRadiation },
  { id: 6, titleKey: "items.lithiumBatteries", Icon: LuBattery },
  { id: 7, titleKey: "items.perishable", Icon: LuThermometer },
  { id: 8, titleKey: "items.culturalAssets", Icon: LuLandmark },
];

export const SPECIAL = [
  { id: 1, titleKey: "special.dryIce", Icon: LuSnowflake },
  { id: 2, titleKey: "special.medicines", Icon: LuPill },
];

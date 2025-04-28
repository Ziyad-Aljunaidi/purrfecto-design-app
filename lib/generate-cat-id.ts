// generateCatID.ts
import { catNames } from "@/lib/cat-names";
import  {nanoid}  from "nanoid";

// 6-character nanoid using lowercase letters and numbers


function getRandomName(): string {
  return catNames[Math.floor(Math.random() * catNames.length)];
}

export function generateCatID(): string {
  const name1 = getRandomName();
  let name2 = getRandomName();

  // Ensure names are not the same
  while (name1 === name2) {
    name2 = getRandomName();
  }

  const suffix = nanoid(8);
  return `${name1}${name2}_${suffix}`;
}

// Example usage
// console.log(generateCatID());

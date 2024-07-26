import ages from "./ages.json";

interface Ages {
  [key: string]: number;
}

// Cast ages to the Ages interface
const ageData: Ages = ages;

const ids = Object.keys(ageData);
const nids = ids.map((e) => parseInt(e));

const minId = nids[0];
const maxId = nids[nids.length - 1];

const getDate = (id: number): [number, Date] => {
  if (id < minId) {
    return [-1, new Date(ageData[ids[0]])];
  } else if (id > maxId) {
    return [1, new Date(ageData[ids[ids.length - 1]])];
  } else {
    let lid = nids[0];
    for (let i = 0; i < ids.length; i++) {
      if (id <= nids[i]) {
        // calculate middle date
        const uid = nids[i];
        const lage = ageData[lid.toString()];
        const uage = ageData[uid.toString()];

        const idratio = (id - lid) / (uid - lid);
        const midDate = Math.floor(idratio * (uage - lage) + lage);
        return [0, new Date(midDate)];
      } else {
        lid = nids[i];
      }
    }
  }
  return [0, new Date()]; // Fallback return
};

const getAge = (id: number): [string, string] => {
  const d = getDate(id);
  return [
    d[0] < 0 ? "older_than" : d[0] > 0 ? "newer_than" : "approx",
    `${d[1].getUTCMonth() + 1}/${d[1].getUTCFullYear()}`,
  ];
};

export default getAge;

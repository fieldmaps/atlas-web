const n = Number(process.env.GATSBY_BASE_SCALE);

export default {
  rivers: [
    [0, 0],
    [n + 5, 3],
  ],
  roadsPrimary: [
    [0, 0],
    [n, 1],
  ],
  roadsSecondary: [
    [n, 0],
    [n + 1, 1],
  ],
  roadsTertiary: [
    [n + 1, 0],
    [n + 2, 1],
  ],
  admin0: [
    [0, 0],
    [n, 3],
  ],
  undeterminedAreas: [
    [0, 0],
    [n, 3],
  ],
  admin1: [
    [0, 0],
    [n, 2],
  ],
  admin2: [
    [n, 0],
    [n + 2, 1],
  ],
  seaPorts1: [
    [n, 0],
    [n + 5, 3],
  ],
  airports1: [
    [n, 0],
    [n + 5, 3],
  ],
  financialServices1: [
    [n, 0],
    [n + 7, 3],
  ],
  educationFacilities1: [
    [n, 0],
    [n + 7, 3],
  ],
  healthFacilities1: [
    [n, 0],
    [n + 7, 3],
  ],
  settlements6: [
    [n + 2, 0],
    [n + 4, 2],
  ],
  settlements5: [
    [n + 1, 0],
    [n + 3, 3],
  ],
  settlements4: [
    [n + 1, 0],
    [n + 3, 3],
  ],
  settlements3: [
    [n, 0],
    [n + 2, 4],
  ],
  settlements2: [
    [n - 1, 0],
    [n + 1, 5],
  ],
  settlements1: [
    [0, 0],
    [n, 5],
  ],
};

const ISCodeValues = new Map();

ISCodeValues.set(0, { Nc: 5.14, Nq: 1.0, Ny: 0.0 });
ISCodeValues.set(5, { Nc: 6.49, Nq: 1.57, Ny: 0.45 });
ISCodeValues.set(10, { Nc: 8.35, Nq: 2.47, Ny: 1.22 });
ISCodeValues.set(15, { Nc: 10.98, Nq: 3.94, Ny: 2.65 });
ISCodeValues.set(20, { Nc: 14.83, Nq: 6.4, Ny: 5.39 });
ISCodeValues.set(25, { Nc: 20.72, Nq: 10.66, Ny: 10.88 });
ISCodeValues.set(30, { Nc: 30.14, Nq: 18.4, Ny: 22.4 });
ISCodeValues.set(35, { Nc: 46.12, Nq: 33.3, Ny: 48.03 });
ISCodeValues.set(40, { Nc: 75.31, Nq: 64.2, Ny: 109.41 });
ISCodeValues.set(45, { Nc: 138.88, Nq: 134.88, Ny: 271.76 });
ISCodeValues.set(50, { Nc: 266.89, Nq: 319.07, Ny: 762.89 });

const terzaghiValues = new Map();

terzaghiValues.set(0, { Nc: 5.7, Nq: 1.0, Ny: 0.0 });
terzaghiValues.set(5, { Nc: 7.3, Nq: 1.6, Ny: 0.5 });
terzaghiValues.set(10, { Nc: 9.6, Nq: 2.7, Ny: 1.2 });
terzaghiValues.set(15, { Nc: 12.9, Nq: 4.4, Ny: 2.5 });
terzaghiValues.set(20, { Nc: 17.7, Nq: 7.4, Ny: 5.0 });
terzaghiValues.set(25, { Nc: 25.1, Nq: 12.7, Ny: 9.7 });
terzaghiValues.set(30, { Nc: 37.2, Nq: 12.5, Ny: 19.7 });
terzaghiValues.set(35, { Nc: 57.8, Nq: 41.4, Ny: 42.4 });
terzaghiValues.set(40, { Nc: 95.7, Nq: 81.3, Ny: 100.4 });
terzaghiValues.set(45, { Nc: 172.3, Nq: 173.3, Ny: 297.5 });
terzaghiValues.set(50, { Nc: 347.5, Nq: 415.1, Ny: 1153.2 });

const meyerHoffValues = new Map();

meyerHoffValues.set(0, { Nc: 5.14, Nq: 1.0, Ny: 0.0 });
meyerHoffValues.set(5, { Nc: 6.49, Nq: 1.57, Ny: 0.1 });
meyerHoffValues.set(10, { Nc: 8.34, Nq: 2.47, Ny: 0.4 });
meyerHoffValues.set(15, { Nc: 10.97, Nq: 3.94, Ny: 1.1 });
meyerHoffValues.set(20, { Nc: 14.83, Nq: 6.4, Ny: 2.9 });
meyerHoffValues.set(25, { Nc: 20.71, Nq: 10.66, Ny: 6.8 });
meyerHoffValues.set(30, { Nc: 30.13, Nq: 18.4, Ny: 15.7 });
meyerHoffValues.set(35, { Nc: 46.345, Nq: 33.55, Ny: 37.75 });
meyerHoffValues.set(40, { Nc: 75.25, Nq: 64.1, Ny: 93.6 });
meyerHoffValues.set(45, { Nc: 133.73, Nq: 134.7, Ny: 262.3 });
meyerHoffValues.set(50, { Nc: 266.50, Nq: 318.5, Ny: 871.7 });

const factorsOfSafety = new Map();

factorsOfSafety.set("sandy", 3);
factorsOfSafety.set("silty", 3);
factorsOfSafety.set("clayey", 3);

export { ISCodeValues, terzaghiValues, meyerHoffValues, factorsOfSafety };

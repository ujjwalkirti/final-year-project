const ISCodeValues = new Map();

ISCodeValues.set(0, { Nc: 5.14, Nq: 1.0, Ny: 0.0 });
ISCodeValues.set(5, { Nc: 6.49, Nq: 1.57, Ny: 0.45 });
ISCodeValues.set(10, { Nc: 8.35, Nq: 2.47, Ny: 1.22 });
ISCodeValues.set(15, { Nc: 10.98, Nq: 3.94, Ny: 2.65 });
ISCodeValues.set(20, { Nc: 14.83, Nq: 6.40, Ny: 5.39 });
ISCodeValues.set(25, { Nc: 20.72, Nq: 10.66, Ny: 10.88});
ISCodeValues.set(30, { Nc: 30.14, Nq: 18.40, Ny: 22.40});
ISCodeValues.set(35, { Nc: 46.12, Nq: 33.30, Ny: 48.03});
ISCodeValues.set(40, { Nc: 75.31, Nq: 64.20, Ny: 109.41});
ISCodeValues.set(45, { Nc: 138.88, Nq: 134.88, Ny: 271.76 });
ISCodeValues.set(50, { Nc: 266.89, Nq: 319.07, Ny: 762.89});

const factorsOfSafety = new Map();

factorsOfSafety.set('sandy', 3);
factorsOfSafety.set("silty", 3);
factorsOfSafety.set("clayey", 3);


export { ISCodeValues,factorsOfSafety };

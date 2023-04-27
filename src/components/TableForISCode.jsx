import React from "react";

const TableForISCode = () => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Φ</th>
            <th>
              N<sub>c</sub>
            </th>
            <th>
              N<sub>q</sub>
            </th>
            <th>
              N<sub>γ</sub>
            </th>
          </tr>
        </thead>
        <tbody>
          {[...ISCodeValues.keys()].map((value, index) => {
            // console.log(value);
            return (
              <tr key={index}>
                <td>{value}</td>
                <td>{ISCodeValues.get(value).Nc}</td>
                <td>{ISCodeValues.get(value).Nq}</td>
                <td>{ISCodeValues.get(value).Ny}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      Using the above table, we can calculate the values:
      <br />
    </div>
  );
};

export default TableForISCode;

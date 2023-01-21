// import React, { useState, useMemo } from "react";
// import { Select } from "antd";
// import countryList from "react-select-country-list";

// const CountrySelect = ({ country, changeHandler }) => {
//   const options = useMemo(() => countryList().getData(), []);

//   return (
//     <div className="reg_grid dark:text-dark-subtle text-light-subtle mt-1 grid grid-cols-3 gap-2 h-9 w-full border-2 dark:border-dark-subtle border-light-subtle p-1 bg-transparent rounded">
//       <Select
//         options={options}
//         value={country}
//         onChange={changeHandler}
//         name="country"
//         className="dark:bg-transparent"
//       />
//       {/* {options.map((option, index) => (
//           <option key={index} value={option}>
//             {option}
//           </option>
//         ))} */}
//       {/* </Select> */}
//     </div>
//   );
// };

// export default CountrySelect;

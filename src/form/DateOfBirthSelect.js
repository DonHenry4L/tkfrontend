import { useMediaQuery } from "react-responsive";

export default function DateOfBirthSelect({
  bDay,
  bMonth,
  bYear,
  days,
  months,
  years,
  handleOnChange,
  dateError,
}) {
  const view1 = useMediaQuery({
    query: "(min-width: 539px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 850px)",
  });
  const view3 = useMediaQuery({
    query: "(min-width: 1170px)",
  });
  return (
    <div
      className="reg_grid dark:text-dark-subtle text-light-subtle mt-1 grid grid-cols-3 gap-2 h-9 w-full border-2 dark:border-dark-subtle border-light-subtle p-1 bg-transparent rounded"
      style={{ marginBottom: `${dateError && !view3 ? "90px" : "0"}` }}
    >
      <select
        name="bDay"
        value={bDay}
        onChange={handleOnChange}
        className="dark:bg-transparent"
      >
        {days.map((day, i) => (
          <option value={day} key={i} className="dark:bg-light-subtle">
            {day}
          </option>
        ))}
      </select>
      <select
        name="bMonth"
        value={bMonth}
        onChange={handleOnChange}
        className="dark:bg-transparent"
      >
        {months.map((month, i) => (
          <option value={month} key={i} className="dark:bg-light-subtle">
            {month}
          </option>
        ))}
      </select>
      <select
        name="bYear"
        value={bYear}
        onChange={handleOnChange}
        className="dark:bg-transparent"
      >
        {years.map((year, i) => (
          <option value={year} key={i} className="dark:bg-light-subtle">
            {year}
          </option>
        ))}
      </select>
      {dateError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}

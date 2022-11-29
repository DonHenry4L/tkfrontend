import { useMediaQuery } from "react-responsive";

export default function GenderSelect({ handleOnChange, genderError }) {
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
      className="reg_grid mt-1 flex justify-center space-x-14 md:gap-2 h-9 w-fit border-2 dark:border-dark-subtle border-light-subtle md:p-1 bg-transparent rounded items-center dark:text-dark-subtle text-light-subtle"
      style={{ marginBottom: `${genderError && !view3 ? "70px" : "0"}` }}
    >
      <label htmlFor="male" className="flex md:gap-2 xs:gap-1">
        Male
        <input
          type="radio"
          name="gender"
          id="male"
          value="male"
          onChange={handleOnChange}
        />
      </label>
      <label htmlFor="female" className="flex md:gap-2 xs:gap-1">
        Female
        <input
          type="radio"
          name="gender"
          id="female"
          value="female"
          onChange={handleOnChange}
        />
      </label>
      <label htmlFor="custom" className="flex md:gap-2 xs:gap-1">
        Custom
        <input
          type="radio"
          name="gender"
          id="custom"
          value="custom"
          onChange={handleOnChange}
        />
      </label>
      {genderError && (
        <div
          className={
            !view3 ? "input_error" : "input_error input_error_select_large"
          }
        >
          <div
            className={!view3 ? "error_arrow_bottom" : "error_arrow_left"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}

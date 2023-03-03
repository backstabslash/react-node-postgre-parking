const blue = "rgba(3, 129, 254, 0.8)",
  red = "rgba(247, 111, 104, 0.8)",
  black = "rgba(22, 22, 23, 1)",
  white = "rgba(229, 229, 229, 1)",
  green = "rgba(44, 187, 93, 0.8)";

export const selectStyles = {
  control: (styles, state) => ({
    ...styles,
    marginBottom: "6px",
    marginTop: "4px",
    borderColor: state.isDisabled ? red : blue,
    boxShadow: "none",
    cursor: "pointer",
    userSelect: "none",
    backgroundColor: black,
    "&:hover": {
      borderColor: blue,
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isDisabled ? red : state.isSelected ? green : blue,
    backgroundColor: black,
    cursor: state.isDisabled
      ? "not-allowed"
      : state.isSelected
      ? "default"
      : "pointer",
    "&:hover": {
      backgroundColor: white,
    },
  }),
  menu: (base, state) => ({
    ...base,
    backgroundColor: black,
  }),
  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? red : blue,
  }),
  singleValue: (base, state) => ({
    ...base,
    color: blue,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isDisabled ? red : blue,
    "&:hover": {
      color: state.isDisabled ? red : blue,
    },
    ":active": {
      ...base[":active"],
      color: state.isDisabled ? red : blue,
    },
  }),
  indicatorSeparator: (base, state) => ({
    ...base,
    backgroundColor: state.isDisabled ? red : blue,
  }),
};

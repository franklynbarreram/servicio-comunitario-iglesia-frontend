export const customStyles = {
  option: (defaultStyles: any, state: any) => ({
    ...defaultStyles,
    borderBottom: "1px solid #fcc824",
    color: state.isSelected ? "black" : state.isFocused ? "white" : "black",
    fontWeight: state.isSelected ? "bold" : "400",
    backgroundColor: state.isDisabled
      ? undefined
      : state.isSelected
      ? "#fcc824"
      : state.isFocused
      ? "var(--color-primary)"
      : undefined,
    cursor: state.isFocused ? "pointer" : undefined,
  }),
  menu: (defaultStyles: any) => ({
    ...defaultStyles,
    position: "relative",
  }),
  control: (defaultStyles: any) => ({
    ...defaultStyles,
    borderRadius: "50px",
    borderColor: "#707070",
    width: "100%",
  }),
  input: (defaultStyles: any) => ({
    ...defaultStyles,
    // padding: 0,
    margin: 0,
    fontSize: "0.875rem",
    paddingTop: "0.75rem",
    paddingBottom: "0.75rem",
  }),
  valueContainer: (defaultStyles: any) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    paddingLeft: "1rem",
    paddingRight: "1rem",
  }),
  singleValue: (defaultStyles: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...defaultStyles, opacity, transition };
  },
};

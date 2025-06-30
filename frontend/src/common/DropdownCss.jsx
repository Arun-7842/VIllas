const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: "#fff", // dropdown background
    borderColor: state.isFocused ? "#e5e7eb" : "#e5e7eb",
    boxShadow: state.isFocused ? "none" : "none",
    "&:hover": {
      borderColor: "none",
    },
    borderRadius: "4px",
    padding: "2px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#014D4E"
      : state.isFocused
      ? "#039a9c"
      : "white",
    color: state.isSelected ? "white" : "#111827",
    padding: "10px 15px",
    cursor: "pointer",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#9ca3af", // gray-400
    fontSize: "14px",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#111827", // gray-900
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "8px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
    marginTop: "4px",
  }),
};

export default customStyles;

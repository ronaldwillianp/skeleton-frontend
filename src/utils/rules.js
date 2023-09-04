const rules = {
  required: (val) => (val && val.length > 0) || "Este campo es requerido",
  requiredSelect: (val) =>
    (val !== null && val !== "") || "Este campo es requerido",
}

export default rules

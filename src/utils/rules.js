const rules = {
  required: (val) => (val && val.length > 0) || "Este campo es requerido",
  requiredSelect: (val) =>
    (val !== null && val !== "") || "Este campo es requerido",
  emailNotRequired: (val) =>
    !val || /.+@.+\..+/.test(val) || "El correo debe de ser válido",
  numberGreaterZero: (val) =>
    (val > 0 && val < 10000) || "Este campo tiene que ser mayor 0",
}

export default rules

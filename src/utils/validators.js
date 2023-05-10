// Esta función devuelve true/false en caso de que el email pase ciertas comprobaciones
export const validateEmail = (email) => {
  const regex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

  const isValid = regex.test(email);
  return isValid;
};

export const validatePassword = (password) => {
  const regularExpressionCheckPassword = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{6,}$/;
  return regularExpressionCheckPassword.test(password);
};

import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .test(
          'correct', // Unique name for the test
          'Invalid password', // Error message
          function(value) { // Custom validation function
            return value === "219377";
          }
        )
});

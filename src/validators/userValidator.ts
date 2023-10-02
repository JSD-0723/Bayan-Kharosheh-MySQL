import Joi from "joi";

const passwordPatternMessage =
  "Password must contain at least 8 characters, one uppercase, one number, and one special character";

const userSchema = Joi.object({
  email: Joi.string()
    .email()
    .options({
      messages: {
        "string.pattern.base": "Please enter a valid email.",
        "string.empty": "Please enter an email address.",
      },
    })
    .trim()
    .required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      passwordPatternMessage
    )
    .options({
      messages: {
        "string.pattern.base": "Please enter a valid password.",
        "string.min": "Minimum 8 characters are required for the password.",
        "string.max": "Maximum 30 characters are allowed for the password.",
      },
    })
    .required(),
});

export default userSchema;

const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next(); // Proceed if validation succeeds
  } catch (error) {
    // const message = error.errors?.[0]?.message || "Invalid input";
    // return res.status(400).json({ error: message });
    next(error)
  }
};

export default validate;
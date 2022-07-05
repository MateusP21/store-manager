const runSchema = (schema) => async (value) => {
  console.log(value);
  const result = await schema.validateAsync(value);

  return result;
};

module.exports = runSchema;

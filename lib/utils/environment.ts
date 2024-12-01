// Returns true, if in production
export const isProduction = () => {
  return process.env.NODE_ENV === "production";
};

import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (plainPassword: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(plainPassword, salt);
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  if (!plainPassword || !hashedPassword) {
    throw new Error('Both plainPassword and hashedPassword are required');
  }
  return bcrypt.compare(plainPassword, hashedPassword);
};

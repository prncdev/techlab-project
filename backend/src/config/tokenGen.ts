import jwt from 'jsonwebtoken';
export const GenerateToken = function(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: '30d' });
}
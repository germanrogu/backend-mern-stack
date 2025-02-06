import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Extendemos la interfaz Request para incluir la propiedad user
export interface AuthRequest extends Request {
  user?: { userId: string };
}

const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // 1. Extraemos el token del header Authorization
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    // 2. Verificamos el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    // 3. Guardamos la información decodificada en la request para usarla después
    req.user = decoded;

    // 4. Pasamos al siguiente middleware o controlador
    next();
  } catch (error) {
    // 5. Si el token es inválido o expirado, devolvemos un error 401
    res.status(401).json({ error: "Invalid token" });
    return;
  }
};

export default authenticate;

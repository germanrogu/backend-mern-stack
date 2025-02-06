import mongoose from "mongoose";
import bcrypt from "bcrypt";

/**
 * pre('save'): Hashea la contraseña antes de guardarla.
 * comparePassword(): Método para validar contraseñas con bcrypt.
 * Roles de usuario: Seguridad y permisos desde el modelo.
 */
interface IUser extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  role: "admin" | "user";
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>("User", UserSchema);

import { JwtPayload } from 'jsonwebtoken';

export type Role = "business_owner" | "branch_manager" | "staff";

export interface MyUserPayload extends JwtPayload {
  id: number;
  business_id: number;
  branch_id: number;
  role: Role;
}
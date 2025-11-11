import { JwtPayload } from 'jsonwebtoken';

export type Role = "business_owner" | "branch_manager" | "staff";

export interface MyUserPayload extends JwtPayload {
  id: string;
  business_id: string;
  branch_id: string;
  role: Role;
}
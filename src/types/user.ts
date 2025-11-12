import { MyUserPayload } from "@/types/jwt";

// Example data for business owner, branch manager, staff
  export const businessOwnerId = 1;
  export const branchManagerId = 2;
  export const staffId = 3;
  export const branchId = 10;
  export const businessId = 100;

export const userStaff: MyUserPayload = {
  id: staffId,
  username: "ali",
  email: "ali@gmail.com",
  role: "staff",
  business_id: businessId,
  branch_id: branchId
}

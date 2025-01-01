import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { HouseholdMemberController } from "../controllers/householdMemberController";
import { validateRequest } from "../middleware/validateRequest";
import { createHouseholdMemberSchema } from "../validators/householdMemberValidators";

const router = Router();

router.post(
  "/household/:householdId/members",
  authenticateToken as any,
  validateRequest(createHouseholdMemberSchema),
  HouseholdMemberController.addMember as any
);
router.get(
  "/household/:householdId/members",
  authenticateToken as any,
  HouseholdMemberController.getMembers as any
);
router.put(
  "/household/:householdId/members/:userId",
  authenticateToken as any,
  HouseholdMemberController.updateRole as any
);

router.delete(
  "/household/:householdId/members/:userId",
  authenticateToken as any,
  HouseholdMemberController.removeMember as any
);
export default router;

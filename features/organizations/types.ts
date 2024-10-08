import { z } from "zod";
import { zfd } from "zod-form-data";

export const organizationSchema = zfd.formData({
  name: z.string().min(8).max(100),
  logo: z.any().optional(),
  country: z.string().min(1),
  description: z.string(),
  email: z.string().email("Invalid email").min(3, "Email is required"),
  address: z.string().min(1, "Address is required"),
});

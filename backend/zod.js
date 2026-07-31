import { z } from "zod";

// 1. Define your blueprint (Schema)
const registrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username cannot exceed 20 characters"),
  
  email: z
    .string()
    .email("Invalid email format address"),
  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),
  
  age: z
    .number({ invalid_type_error: "Age is required and must be a number" })
    .min(18, "You must be at least 18 years old")
});

// 2. Main processing function using .safeParse()
function processRegistration(incomingData) {
  const result = registrationSchema.safeParse(incomingData);

  if (!result.success) {
    // Format errors into a clean, readable key-value object
    const errorMap = result.error.flatten().fieldErrors;
    return { success: false, errors: errorMap };
  }

  // result.data contains ONLY the validated data fields
  return { success: true, data: result.data };
}

// ==========================================
// 3. Test Cases (Running the Project)
// ==========================================

console.log("--- TEST 1: Bad Submission ---");
const badSubmission = {
  username: "al",
  email: "not-an-email",
  password: "123",
  age: 16
};
console.log(processRegistration(badSubmission));

console.log("\n--- TEST 2: Perfect Submission ---");
const goodSubmission = {
  username: "alex_dev",
  email: "alex@example.com",
  password: "super_secure_password",
  age: 25,
  hackerField: "drop database users;" // This extra field will be safely ignored
};
console.log(processRegistration(goodSubmission));

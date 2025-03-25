export type SignupData = {
  id: string;
  cookie: string;
};

export const handleSignup = async (
  request: Request,
): Promise<SignupData | null> => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (email && password) {
    return {
      id: "id",
      cookie: "nomnom",
    };
  }

  return null;
};

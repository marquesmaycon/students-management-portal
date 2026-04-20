import { mutationOptions } from "@tanstack/react-query";

import { signIn } from "./service";

export const signInOptions = mutationOptions({
  mutationKey: ["auth", "sign-in"],
  mutationFn: signIn,
});

import SignInForm from "../../../../components/auth/SignInForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Snapxz",
  description: "This is a social app dashboard template",
};

export default function SignIn() {
  return <SignInForm />;
}

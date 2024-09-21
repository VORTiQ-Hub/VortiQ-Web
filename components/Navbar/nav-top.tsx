import { SignOutButton } from "@/components/auth/sign-out-button";

export default function NavTop() {
  return (
    <div className="min-h-[60px] w-full flex justify-end items-center px-6 border-b">
      <SignOutButton />
    </div>
  )
}
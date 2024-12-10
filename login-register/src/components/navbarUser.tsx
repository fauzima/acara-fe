import { SessionProviderUser } from "@/context/useSessionUser";
import { AvatarUser } from "./avatarUser";

export default function NavbarUser() {
  return (
    <div className="sticky top-0 z-10 flex h-[60px] justify-center bg-blue-800 shadow-md">
      <SessionProviderUser>
        <AvatarUser />
      </SessionProviderUser>
    </div>
  );
}

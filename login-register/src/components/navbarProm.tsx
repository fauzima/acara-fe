import { AvatarProm } from "./avatarProm";
import { SessionProviderProm } from "@/context/useSessionProm";

export default function NavbarProm() {
  return (
    <div className="sticky top-0 z-10 flex h-[60px] justify-center bg-blue-800 shadow-md">
      <SessionProviderProm>
        <AvatarProm />
      </SessionProviderProm>
    </div>
  );
}

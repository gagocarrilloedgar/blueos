import { AuthRepository } from "@/modules/auth/domain";
import { useState } from "react";
import { useSession } from "../auth/AuthProvider";
import { MobileSidebar } from "./MobileSidebar";
import { SideBar } from "./Sidebar";

export function Dashboard({ authRepo }: { authRepo: AuthRepository }) {
  const { loading } = useSession();
  const [hide, setHide] = useState<boolean>(false);

  if (loading) return;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[300px_1fr] lg:grid-cols-[300px_1fr]">
      <SideBar
        hide={hide}
        hideSideBar={() => {
          setHide(true);
        }}
        authRepo={authRepo}
      />
      <div className="flex flex-col">
        <MobileSidebar
          hide={hide}
          showSidebar={() => {
            setHide(false);
          }}
        />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <nav></nav>
        </main>
      </div>
    </div>
  );
}

import { PropsWithChildren } from "react";

export const Compress = ({
  children,
  useCompress
}: PropsWithChildren<{ useCompress?: boolean }>) => {
  return (
    <div
      className="mx-auto transition-all"
      style={{ marginRight: useCompress ? "33.5%" : "0" }}
    >
      {children}
    </div>
  );
};

Compress.displayName = "Compress";

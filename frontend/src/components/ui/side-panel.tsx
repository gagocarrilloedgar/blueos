import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { X as CloseIcon } from "lucide-react";
import * as React from "react";

const slidePanelVariants = cva(
  "fixed z-40 gap-4 bg-background p-6 transition-all duration-300 ease-in-out",
  {
    variants: {
      side: {
        right: "top-0 bottom-0 right-0 h-full w-3/4 border-l",
        left: "top-0 bottom-0 left-0 h-full w-3/4 border-r"
      },
      state: {
        open: "sm:max-w-sm",
        closed: "sm:max-w-md"
      }
    },
    defaultVariants: {
      side: "right",
      state: "open"
    }
  }
);

interface SlidePanelProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof slidePanelVariants> {
  sidebarOpen?: boolean;
  open?: boolean;
  onClose?: () => void;
}

const SlidePanel = React.forwardRef<HTMLDivElement, SlidePanelProps>(
  (
    {
      side = "right",
      state = "open",
      className,
      sidebarOpen = false,
      children,
      open,
      onClose,
      ...props
    },
    ref
  ) => {
    console.log(sidebarOpen);
    return (
      <motion.div
        ref={ref}
        className={cn(slidePanelVariants({ side, state }), className)}
        initial={{ x: side === "right" ? "100%" : "-100%" }}
        animate={{
          x: open ? "0" : side === "right" ? "100%" : "-100%"
        }}
        transition={{ duration: 0.2 }}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <CloseIcon className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </motion.div>
    );
  }
);
SlidePanel.displayName = "SlidePanel";

// Optional: Create header and footer components for consistency
const SlidePanelHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SlidePanelHeader.displayName = "SlidePanelHeader";

const SlidePanelFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SlidePanelFooter.displayName = "SlidePanelFooter";

export { SlidePanel, SlidePanelFooter, SlidePanelHeader };

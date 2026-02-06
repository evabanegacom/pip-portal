import React, { useEffect } from "react";
import type { ReactNode } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon, ChevronRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  triggerButton: ReactNode;
  triggerClassName?: string;
  dropdownContentClassName?: string;
  position?: "center" | "start" | "end";
  hideIcon?: boolean;
  sideOffset?: number;
  setOpen?: (arg0: boolean) => void;
  open?: boolean;
  iconColor?: string;
  modal?: boolean;
  maxHeight?: string;
  handleTrigger?: () => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement> | undefined;
};

const DropdownComponent = ({
  children,
  triggerButton,
  dropdownContentClassName,
  triggerClassName,
  position = "end",
  hideIcon = false,
  maxHeight = "400px",
  sideOffset,
  setOpen,
  open,
  modal = false,
  iconColor,
  onBlur,
  handleTrigger,
}: Props) => {
  // useEffect(() => {
  //   window.addEventListener("closeDropdown", () => setOpen?.(false));
  // }, []);

  useEffect(() => {
    const handler = () => setOpen?.(false);
    window.addEventListener("closeDropdown", handler);
    return () => window.removeEventListener("closeDropdown", handler);
  }, [setOpen]);

  return (
    <DropdownMenu.Root modal={modal} open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger
        onClick={(e) => {
          e.stopPropagation();
          handleTrigger && handleTrigger();
        }}
        className={cn("flex items-center justify-between", triggerClassName)}
        onBlur={onBlur}
        // asChild
      >
        {triggerButton}

        {!hideIcon && (
          <span className="dark:text-theme-text-400">
            {open ? (
              <ChevronUpIcon className={cn("ml-2 w-4 h-4", iconColor)} />
            ) : (
              <ChevronDownIcon className={cn("ml-2 w-4 h-4", iconColor)} />
            )}
          </span>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={cn(
            "z-20 min-w-[100px] bg-white border border-gray-300 shadow-xl rounded-md p-2 dark:bg-theme-dark dark:border-theme-border-600",
            dropdownContentClassName
          )}
          sideOffset={sideOffset || 5}
          alignOffset={0}
          align={position}
          style={{ maxHeight: maxHeight, overflowY: "auto" }}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

type SubMenuProps = {
  label: ReactNode;
  children: ReactNode;
  className?: string;
};

const SubMenu = ({ label, children, className }: SubMenuProps) => {
  return (
    <DropdownMenu.Sub>
      <DropdownMenu.SubTrigger
        className={cn(
          "flex items-center justify-between w-full p-2 rounded-md dark:hover:bg-theme-darker dark:focus:bg-theme-darker hover:bg-gray-100 focus:bg-gray-100",
          className
        )}
      >
        {label}
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </DropdownMenu.SubTrigger>

      <DropdownMenu.SubContent
        className="min-w-[150px] bg-white dark:bg-theme-darker border border-gray-300 shadow-xl rounded-md p-2 border-none text-sm"
        sideOffset={8}
      >
        {children}
      </DropdownMenu.SubContent>
    </DropdownMenu.Sub>
  );
};

export default DropdownComponent;
export { SubMenu };



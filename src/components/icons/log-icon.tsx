import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const LogIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
        className={cn("h-6 w-6", props.className)}
    >
        <path d="M12 5V19" />
        <path d="M5 12H19" />
    </svg>
);

export default LogIcon;

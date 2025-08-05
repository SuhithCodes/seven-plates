import { cn } from "@/lib/utils";
import type { SVGProps } from "react";

const SevenPIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        {...props}
        className={cn("h-6 w-6", props.className)}
    >
        <g fill="currentColor">
            <path d="M11.3,4.33c-0.12,0.51-0.23,0.91-0.34,1.42c-0.19,0.85-0.37,1.69-0.56,2.54c-0.11,0.48-0.22,0.96-0.33,1.44c-0.08,0.36-0.16,0.72-0.25,1.08c-0.03,0.13-0.06,0.26-0.09,0.38l-0.8,3.15h5.1l-1.68,3.36h3.36l3.99-8.13h-7.8Zm-1.89,12.74l0.84-1.68h-3.36l-0.84,1.68H2.1v2.52h6.72v-2.52h-1.89Zm5.79,0c0.92,0,1.68,0.76,1.68,1.68s-0.76,1.68-1.68,1.68h-1.68v-3.36h1.68Z" />
        </g>
    </svg>
);

export default SevenPIcon;

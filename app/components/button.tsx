import { phoneDanger } from "@/public";
import Image from "next/image";

interface buttonTypes {
    text: string;
    variant: "primary" | "secondary" | "danger";
    onClick?: (e?: React.MouseEvent | React.FormEvent) => void;
}

const Button = ({text, variant, onClick}: buttonTypes) => {
    return (
        <div 
            className={` flex justify-center items-center gap-5 py-4 w-fit px-8 text-sm font-light tracking-wide ${variant === "primary" ? "bg-gradient-to-r from-primary to-secondary text-white" : variant === "secondary" ? "text-secondary font-semibold" : "border-danger text-danger bg-background group hover:bg-danger hover:text-white transition-all duration-300 font-semibold border-2"} rounded-md font-medium cursor-pointer`}
            onClick={onClick}
        >
            {variant === 'danger' && <Image src={phoneDanger} className="group-hover:bg-white" alt="Appel d'urgence" width={18} height={18} />}
            {text}
        </div>
    )
}

export default Button
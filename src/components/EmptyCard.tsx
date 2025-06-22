import type { ReactNode } from "react";

interface EmptyCardProps {
    children: ReactNode;
}

const EmptyCard = ({ children }: EmptyCardProps) => (
    <div className="w-64 p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white text-gray-800">
        {children}
    </div>
);

export default EmptyCard;
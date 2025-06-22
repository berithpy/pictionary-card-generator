import Header from './Header';
import Item from './Item';
import type { ItemType } from './Item';

interface CardProps {
    title: string;
    items: { type: ItemType; label: string }[];
}

const Card = ({ title, items }: CardProps) => (
    <div className="w-64 p-4 border-2 border-gray-300 rounded-lg shadow-md bg-white text-gray-800">
        <Header title={title} />
        <div className="mt-2">
            {items.map((item) => (
                <Item key={item.type} type={item.type} label={item.label} />
            ))}
        </div>
    </div>
);

export default Card;

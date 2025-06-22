type ItemType = 'person' | 'object' | 'action' | 'difficult' | 'allplay';

interface ItemProps {
    type: ItemType;
    label: string;
}

const colorMap: Record<ItemType, string> = {
    person: 'bg-yellow-300 text-yellow-900',
    object: 'bg-blue-300 text-blue-900',
    action: 'bg-pink-300 text-pink-900',
    difficult: 'bg-green-300 text-green-900',
    allplay: 'bg-red-300 text-red-900',
};

const labelMap: Record<ItemType, string> = {
    person: 'P',
    object: 'O',
    action: 'A',
    difficult: 'D',
    allplay: 'TJ',
};

const Item = ({ type, label }: ItemProps) => (
    <div className={`flex justify-between items-center p-2 mb-2 rounded ${colorMap[type]}`}>
        <span className="font-bold uppercase mr-4">{labelMap[type]}</span>
        <span>{label}</span>
    </div>
);

export type { ItemType };
export default Item;

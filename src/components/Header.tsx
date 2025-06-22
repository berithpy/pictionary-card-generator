
interface HeaderProps {
    title: string;
    subtitle?: string;
}

const Header = ({ title, subtitle }: HeaderProps) => (
    <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm">{subtitle}</p>}
    </div>
);

export default Header;

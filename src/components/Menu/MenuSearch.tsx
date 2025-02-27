import React from 'react';
import { Search } from 'lucide-react';

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const MenuSearch: React.FC<MenuSearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative mb-8">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search menu items..."
        className="input pl-10"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
    </div>
  );
};

export default MenuSearch;
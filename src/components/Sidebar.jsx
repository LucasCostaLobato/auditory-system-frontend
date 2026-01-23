import { useLanguage } from '../contexts/LanguageContext';
import { Home, Settings } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import './Sidebar.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t('menu.home'), icon: Home },
    { id: 'settings', label: t('menu.settings'), icon: Settings },
    { id: 'outerEar', label: t('menu.outerEar'), icon: Settings },
    { id: 'middleEar', label: t('menu.middleEar'), icon: Settings },
    { id: 'innerEar', label: t('menu.innerEar'), icon: Settings }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SimAudiS</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Sidebar;

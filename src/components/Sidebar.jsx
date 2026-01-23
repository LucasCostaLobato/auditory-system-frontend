import { useLanguage } from '../contexts/LanguageContext';
import './Sidebar.css';

const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'home', label: t('menu.home') },
    { id: 'settings', label: t('menu.settings') },
    { id: 'outerEar', label: t('menu.outerEar') },
    { id: 'middleEar', label: t('menu.middleEar') },
    { id: 'innerEar', label: t('menu.innerEar') }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Auditory System</h2>
      </div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-item ${activeMenu === item.id ? 'active' : ''}`}
            onClick={() => setActiveMenu(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

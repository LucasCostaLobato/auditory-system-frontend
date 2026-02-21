import { Menu } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import './MobileHeader.css';

const MobileHeader = ({ onMenuOpen }) => {
  return (
    <header className="mobile-header">
      <button className="mobile-menu-btn" onClick={onMenuOpen} aria-label="Abrir menu">
        <Menu size={24} />
      </button>
      <span className="mobile-header-title">SimAudiS</span>
      <div className="mobile-header-lang">
        <LanguageSelector compact />
      </div>
    </header>
  );
};

export default MobileHeader;

import { Bell, CheckCheck, ChevronLeft, Menu, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const quickNotifications = [
    { title: 'جلسة أحمد محمد قادمة', time: 'منذ 15 دقيقة' },
    { title: 'تقرير سارة علي جاهز للمراجعة', time: 'منذ ساعة' },
    { title: 'تم تسجيل تقييم جديد', time: 'منذ 3 ساعات' },
  ];

  return <header className="topbar">
    <div className="topbar-right"><button className="icon-button mobile-menu" onClick={onMenuClick}><Menu size={22}/></button><div className="topbar-title"><span className="eyebrow">بوابة المعالج</span><strong>لوحة التحكم الرئيسية</strong></div></div>
    <div className="topbar-left">
      <button className="icon-button desktop-only"><Search size={19}/></button>
      <div className="header-notification-wrap">
        <button className={`icon-button notification-button ${open ? 'notification-open' : ''}`} onClick={() => setOpen(!open)} aria-label="الإشعارات"><Bell size={19}/><span/></button>
        {open && <div className="notification-popover">
          <div className="notification-popover-head"><div><strong>الإشعارات</strong><span>3 تنبيهات جديدة</span></div><button onClick={() => navigate('/therapist/notifications')}><CheckCheck size={15}/> فتح المركز</button></div>
          <div className="notification-popover-list">{quickNotifications.map((item) => <button key={item.title} onClick={() => { setOpen(false); navigate('/therapist/notifications'); }}><i/><div><strong>{item.title}</strong><span>{item.time}</span></div><ChevronLeft size={14}/></button>)}</div>
          <button className="notification-popover-footer" onClick={() => { setOpen(false); navigate('/therapist/notifications'); }}>عرض كل الإشعارات <ChevronLeft size={14}/></button>
        </div>}
      </div>
      <div className="doctor-profile"><div className="avatar">د</div><div><strong>د. أحمد محمد</strong><small>معالج</small></div></div>
    </div>
  </header>
}

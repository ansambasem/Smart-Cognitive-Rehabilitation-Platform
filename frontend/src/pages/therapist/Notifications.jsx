import { useMemo, useState } from 'react';
import { Bell, CalendarDays, Check, CheckCheck, ChevronLeft, Clock3, FileText, Info, Settings2, UserRound } from 'lucide-react';

const initialNotifications = [
  { id: 1, type: 'session', title: 'جلسة قادمة', text: 'جلسة أحمد محمد تبدأ اليوم الساعة 10:30.', time: 'منذ 15 دقيقة', read: false },
  { id: 2, type: 'report', title: 'تقرير جاهز للمراجعة', text: 'تقرير سارة علي للفترة الأخيرة جاهز للمراجعة.', time: 'منذ ساعة', read: false },
  { id: 3, type: 'patient', title: 'تحديث في ملف مريض', text: 'تم تسجيل نتائج تقييم جديدة لمحمد حسن.', time: 'منذ 3 ساعات', read: true },
  { id: 4, type: 'system', title: 'تحديث في إعدادات المنصة', text: 'تم حفظ إعدادات الإشعارات بنجاح.', time: 'أمس', read: true },
  { id: 5, type: 'session', title: 'جلسة مكتملة', text: 'تم إنهاء جلسة ليان خالد وإضافة النتيجة.', time: 'أمس', read: true },
];

const icons = { session: CalendarDays, report: FileText, patient: UserRound, system: Settings2 };
const tones = { session: 'blue', report: 'purple', patient: 'teal', system: 'orange' };

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => filter === 'unread' ? items.filter((item) => !item.read) : items, [items, filter]);
  const unread = items.filter((item) => !item.read).length;

  const markRead = (id) => setItems((current) => current.map((item) => item.id === id ? { ...item, read: true } : item));
  const markAllRead = () => setItems((current) => current.map((item) => ({ ...item, read: true })));

  return (
    <div className="notifications-page">
      <div className="page-intro notifications-intro">
        <div><h1>الإشعارات</h1><p>تابع آخر التحديثات المتعلقة بالمرضى والجلسات والتقارير.</p></div>
        <button className="primary-button notification-mark-all" onClick={markAllRead}><CheckCheck size={16}/> تحديد الكل كمقروء</button>
      </div>

      <div className="notification-kpis">
        <div className="notification-kpi"><div className="notification-kpi-icon blue"><Bell size={19}/></div><div><span>إجمالي الإشعارات</span><strong>{items.length}</strong><small>آخر التحديثات</small></div></div>
        <div className="notification-kpi"><div className="notification-kpi-icon red"><Info size={19}/></div><div><span>غير مقروءة</span><strong>{unread}</strong><small>تحتاج انتباهك</small></div></div>
        <div className="notification-kpi"><div className="notification-kpi-icon teal"><CalendarDays size={19}/></div><div><span>جلسات اليوم</span><strong>8</strong><small>3 مكتملة</small></div></div>
        <div className="notification-kpi"><div className="notification-kpi-icon green"><Check size={19}/></div><div><span>آخر مراجعة</span><strong>اليوم</strong><small>قبل 15 دقيقة</small></div></div>
      </div>

      <section className="panel notifications-panel">
        <div className="notifications-toolbar">
          <div><h2>آخر التنبيهات</h2><p>يمكنك فتح التنبيه أو وضعه كمقروء.</p></div>
          <div className="notification-tabs">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>الكل <b>{items.length}</b></button>
            <button className={filter === 'unread' ? 'active' : ''} onClick={() => setFilter('unread')}>غير مقروء <b>{unread}</b></button>
          </div>
        </div>
        <div className="notification-list">
          {filtered.map((item) => {
            const Icon = icons[item.type] || Bell;
            return <article key={item.id} className={`notification-row ${item.read ? 'read' : 'unread'}`}>
              <div className={`notification-icon ${tones[item.type]}`}><Icon size={18}/></div>
              <div className="notification-copy"><div className="notification-title"><strong>{item.title}</strong>{!item.read && <span className="unread-dot"/>}</div><p>{item.text}</p><small><Clock3 size={12}/> {item.time}</small></div>
              <button className="notification-action" onClick={() => markRead(item.id)} disabled={item.read}>{item.read ? 'مقروء' : 'تحديد كمقروء'}<ChevronLeft size={14}/></button>
            </article>;
          })}
          {!filtered.length && <div className="empty-state">لا توجد إشعارات غير مقروءة حاليًا.</div>}
        </div>
      </section>
    </div>
  );
}

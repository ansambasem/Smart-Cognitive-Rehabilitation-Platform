import { useMemo, useState } from 'react';
import { ChevronLeft, Filter, MoreHorizontal, Plus, Search, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const patients = [
  { id: 1, name: 'أحمد محمد', age: 42, condition: 'إصابة دماغية', level: 'متوسط', progress: 78, lastSession: 'اليوم، 10:00', status: 'مستقر', initials: 'أم' },
  { id: 2, name: 'سارة علي', age: 35, condition: 'ضعف الانتباه', level: 'متقدم', progress: 84, lastSession: 'أمس، 11:00', status: 'مستقر', initials: 'سع' },
  { id: 3, name: 'محمد حسن', age: 51, condition: 'تأهيل معرفي', level: 'مبتدئ', progress: 46, lastSession: 'أمس، 12:00', status: 'يحتاج متابعة', initials: 'مح' },
  { id: 4, name: 'ليان خالد', age: 29, condition: 'مشاكل الذاكرة', level: 'متوسط', progress: 66, lastSession: '28 سبتمبر، 09:30', status: 'مستقر', initials: 'لك' },
  { id: 5, name: 'عمر يوسف', age: 47, condition: 'سرعة الاستجابة', level: 'متوسط', progress: 39, lastSession: '27 سبتمبر، 13:00', status: 'يحتاج مراجعة', initials: 'عي' },
  { id: 6, name: 'نور أحمد', age: 38, condition: 'الوظائف التنفيذية', level: 'متقدم', progress: 91, lastSession: '26 سبتمبر، 10:30', status: 'مستقر', initials: 'نأ' },
  { id: 7, name: 'ياسر محمود', age: 56, condition: 'الانتباه والذاكرة', level: 'مبتدئ', progress: 52, lastSession: '25 سبتمبر، 11:30', status: 'يحتاج متابعة', initials: 'يم' },
  { id: 8, name: 'ريم سامي', age: 32, condition: 'الإدراك البصري', level: 'متوسط', progress: 73, lastSession: '24 سبتمبر، 12:30', status: 'مستقر', initials: 'رس' },
];

const filters = ['الكل', 'مستقر', 'يحتاج متابعة', 'يحتاج مراجعة'];

export default function Patients() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('الكل');
  const [menu, setMenu] = useState(null);
  const navigate = useNavigate();

  const filtered = useMemo(() => patients.filter((p) => {
    const matchesQuery = `${p.name} ${p.condition}`.includes(query.trim());
    const matchesFilter = filter === 'الكل' || p.status === filter;
    return matchesQuery && matchesFilter;
  }), [query, filter]);

  return (
    <div className="patients-page" onClick={() => menu && setMenu(null)}>
      <div className="page-intro patients-intro">
        <div>
          <div className="breadcrumb">الرئيسية <ChevronLeft size={13} /> المرضى</div>
          <h1>المرضى</h1>
          <p>إدارة ومتابعة جميع حالات المرضى وبرامج التأهيل المعرفي.</p>
        </div>
        <button className="primary-button"><Plus size={17} /> إضافة مريض</button>
      </div>

      <div className="patient-stats">
        <div><span>إجمالي المرضى</span><strong>24</strong><small>حالة مسجلة</small></div>
        <div><span>حالات مستقرة</span><strong>14</strong><small>58% من المرضى</small></div>
        <div><span>تحتاج متابعة</span><strong>7</strong><small>تحتاج جلسات قريبة</small></div>
        <div><span>تحتاج مراجعة</span><strong>3</strong><small>تحتاج انتباه</small></div>
      </div>

      <section className="panel patients-panel">
        <div className="patients-toolbar">
          <div className="search-box"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن اسم المريض أو الحالة..." /></div>
          <div className="filter-box"><Filter size={16} /> <span>التصفية</span></div>
        </div>
        <div className="filter-tabs">{filters.map((item) => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div>

        <div className="patients-table-wrap">
          <table className="patients-table">
            <thead><tr><th>المريض</th><th>العمر</th><th>الحالة / التشخيص</th><th>المستوى</th><th>التقدم</th><th>آخر جلسة</th><th>الحالة</th><th></th></tr></thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td><div className="patient-cell"><div className="patient-avatar"><UserRound size={17} /></div><div><strong>{p.name}</strong><small>رقم المريض #{String(p.id).padStart(3, '0')}</small></div></div></td>
                  <td>{p.age} سنة</td><td>{p.condition}</td><td><span className="level-pill">{p.level}</span></td>
                  <td><div className="progress-cell"><div className="progress-track"><span style={{ width: `${p.progress}%` }} /></div><b>{p.progress}%</b></div></td>
                  <td>{p.lastSession}</td><td><span className={`patient-status ${p.status === 'مستقر' ? 'stable' : p.status === 'يحتاج متابعة' ? 'follow' : 'review'}`}>{p.status}</span></td>
                  <td className="action-cell"><button className="more-button" onClick={(e) => { e.stopPropagation(); setMenu(menu === p.id ? null : p.id); }}><MoreHorizontal size={18} /></button>{menu === p.id && <div className="patient-menu"><button onClick={() => navigate(`/therapist/patients/${p.id}`)}>عرض الملف</button><button onClick={() => navigate(`/therapist/patients/${p.id}`)}>بدء جلسة</button><button>عرض التقرير</button></div>}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="empty-state">لا توجد نتائج مطابقة للبحث أو التصفية.</div>}
        </div>
        <div className="table-footer"><span>عرض {filtered.length} من أصل 24 مريض</span><span>الصفحة 1 من 3</span></div>
      </section>
    </div>
  );
}

import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowUpLeft,
  BarChart3,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  Filter,
  Play,
  Search,
  UserRound,
  Brain,
  Target,
  Zap,
  MoreHorizontal,
} from 'lucide-react';

const assessments = [
  { id: 1, patient: 'أحمد محمد', type: 'التقييم المعرفي الشامل', domains: ['الذاكرة', 'الانتباه', 'الوظائف التنفيذية'], date: '30 سبتمبر 2026', duration: '25 دقيقة', score: 82, status: 'مكتمل', trend: '+6%', accent: 'blue' },
  { id: 2, patient: 'سارة علي', type: 'تقييم الانتباه والتركيز', domains: ['الانتباه', 'سرعة الاستجابة'], date: '29 سبتمبر 2026', duration: '18 دقيقة', score: 76, status: 'مكتمل', trend: '+3%', accent: 'teal' },
  { id: 3, patient: 'محمد حسن', type: 'التقييم الأولي', domains: ['الذاكرة', 'حل المشكلات'], date: '28 سبتمبر 2026', duration: '30 دقيقة', score: 64, status: 'مكتمل', trend: 'جديد', accent: 'purple' },
  { id: 4, patient: 'ليان خالد', type: 'إعادة تقييم منتصف الخطة', domains: ['الذاكرة العاملة', 'الانتباه'], date: '27 سبتمبر 2026', duration: '22 دقيقة', score: 71, status: 'مكتمل', trend: '+9%', accent: 'orange' },
  { id: 5, patient: 'عمر يوسف', type: 'تقييم سرعة الاستجابة', domains: ['سرعة الاستجابة'], date: '01 أكتوبر 2026', duration: '15 دقيقة', score: null, status: 'مجدول', trend: 'غدًا', accent: 'blue' },
  { id: 6, patient: 'نور أحمد', type: 'التقييم المعرفي الشامل', domains: ['الذاكرة', 'الانتباه', 'حل المشكلات'], date: '02 أكتوبر 2026', duration: '25 دقيقة', score: null, status: 'مجدول', trend: 'بعد يومين', accent: 'teal' },
];

const domainCards = [
  { title: 'الذاكرة', value: '78%', note: 'متوسط المرضى النشطين', icon: Brain, tone: 'blue' },
  { title: 'الانتباه', value: '84%', note: 'تحسن خلال 30 يومًا', icon: Target, tone: 'teal' },
  { title: 'سرعة الاستجابة', value: '72%', note: 'متوسط آخر تقييمات', icon: Zap, tone: 'orange' },
  { title: 'الوظائف التنفيذية', value: '69%', note: 'متوسط التقييمات المكتملة', icon: Activity, tone: 'purple' },
];

export default function Assessments() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('الكل');
  const [domain, setDomain] = useState('كل المجالات');

  const filtered = useMemo(() => assessments.filter((item) => {
    const matchesStatus = filter === 'الكل' || item.status === filter;
    const haystack = `${item.patient} ${item.type} ${item.domains.join(' ')}`;
    const matchesQuery = haystack.includes(query.trim());
    const matchesDomain = domain === 'كل المجالات' || item.domains.includes(domain);
    return matchesStatus && matchesQuery && matchesDomain;
  }), [query, filter, domain]);

  return (
    <div className="assessments-page">
      <div className="page-intro assessments-intro">
        <div>
          <div className="breadcrumb">التقييمات</div>
          <h1>التقييمات</h1>
          <p>إنشاء التقييمات المعرفية ومراجعة النتائج والتغير في أداء المرضى.</p>
        </div>
        <button className="primary-button"><ClipboardCheck size={16} /> تقييم جديد</button>
      </div>

      <div className="assessment-stats">
        <div className="assessment-stat"><span>التقييمات المكتملة</span><strong>124</strong><small>خلال هذا الشهر</small><CheckCircle2 size={21} /></div>
        <div className="assessment-stat"><span>مجدولة</span><strong>9</strong><small>خلال الأسبوع القادم</small><Clock3 size={21} /></div>
        <div className="assessment-stat"><span>متوسط النتيجة</span><strong>78%</strong><small>آخر 30 يومًا</small><BarChart3 size={21} /></div>
        <div className="assessment-stat"><span>متوسط التحسن</span><strong>+7%</strong><small>مقارنة بالتقييم السابق</small><ArrowUpLeft size={21} /></div>
      </div>

      <div className="assessment-domain-grid">
        {domainCards.map(({ title, value, note, icon: Icon, tone }) => (
          <div className={`assessment-domain-card ${tone}`} key={title}>
            <span className="assessment-domain-icon"><Icon size={18} /></span>
            <div><strong>{value}</strong><b>{title}</b><small>{note}</small></div>
          </div>
        ))}
      </div>

      <section className="panel assessments-management">
        <div className="assessment-toolbar">
          <div className="search-box assessment-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث باسم المريض أو نوع التقييم..." /></div>
          <div className="assessment-filter-row">
            <div className="assessment-select-wrap"><Filter size={14} /><select value={domain} onChange={(e) => setDomain(e.target.value)}><option>كل المجالات</option><option>الذاكرة</option><option>الانتباه</option><option>سرعة الاستجابة</option><option>حل المشكلات</option><option>الوظائف التنفيذية</option></select></div>
            <div className="session-filters">{['الكل', 'مجدول', 'مكتمل'].map((f) => <button key={f} onClick={() => setFilter(f)} className={filter === f ? 'active' : ''}><Filter size={13} />{f}</button>)}</div>
          </div>
        </div>

        <div className="assessments-table-wrap">
          <table className="assessments-table">
            <thead><tr><th>المريض</th><th>نوع التقييم</th><th>المجالات</th><th>التاريخ</th><th>المدة</th><th>النتيجة</th><th>الحالة</th><th></th></tr></thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.id}>
                  <td><div className="assessment-patient"><span className="assessment-avatar"><UserRound size={15} /></span><div><b>{item.patient}</b><small>ملف معرفي نشط</small></div></div></td>
                  <td><strong className="assessment-type">{item.type}</strong></td>
                  <td><div className="domain-tags">{item.domains.map((d) => <span key={d}>{d}</span>)}</div></td>
                  <td>{item.date}</td>
                  <td><span className="assessment-duration"><Clock3 size={13} />{item.duration}</span></td>
                  <td>{item.score ? <div className="assessment-score"><b>{item.score}%</b><small>{item.trend}</small></div> : <span className="muted-dash">—</span>}</td>
                  <td><span className={`assessment-status ${item.status === 'مكتمل' ? 'done' : 'scheduled'}`}>{item.status === 'مكتمل' ? <CheckCircle2 size={13} /> : <Clock3 size={13} />}{item.status}</span></td>
                  <td><button className="assessment-more" aria-label="المزيد"><MoreHorizontal size={17} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="empty-state">لا توجد تقييمات مطابقة للفلاتر الحالية.</div>}
        </div>
        <div className="table-footer"><span>عرض {filtered.length} تقييم</span><span>آخر تحديث: اليوم</span></div>
      </section>

      <section className="panel assessment-templates">
        <div className="section-heading"><div><h3>قوالب التقييم</h3><p>قوالب جاهزة لتسريع إنشاء التقييمات المتكررة.</p></div><button className="text-button">عرض الكل <ArrowUpLeft size={13} /></button></div>
        <div className="template-grid">
          <button className="template-card"><span className="template-icon blue"><ClipboardCheck size={18} /></span><div><b>التقييم المعرفي الشامل</b><small>20 سؤالًا · 25 دقيقة</small></div><Play size={15} /></button>
          <button className="template-card"><span className="template-icon teal"><Eye size={18} /></span><div><b>تقييم الانتباه والتركيز</b><small>12 مهمة · 18 دقيقة</small></div><Play size={15} /></button>
          <button className="template-card"><span className="template-icon purple"><Brain size={18} /></span><div><b>تقييم الذاكرة العاملة</b><small>10 مهام · 15 دقيقة</small></div><Play size={15} /></button>
        </div>
      </section>
    </div>
  );
}

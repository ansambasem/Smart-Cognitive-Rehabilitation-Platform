import { useMemo, useState } from 'react';
import {
  ArrowUpLeft,
  BarChart3,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  Download,
  FileText,
  Filter,
  Printer,
  Search,
  Target,
  TrendingUp,
  UserRound,
  Zap,
} from 'lucide-react';

const reportRows = [
  { id: 1, patient: 'أحمد محمد', type: 'تقرير تقدم شهري', period: 'سبتمبر 2026', score: 82, change: '+8%', sessions: 12, status: 'جاهز', tone: 'blue' },
  { id: 2, patient: 'سارة علي', type: 'تقرير تقدم علاجي', period: 'سبتمبر 2026', score: 76, change: '+5%', sessions: 10, status: 'جاهز', tone: 'teal' },
  { id: 3, patient: 'محمد حسن', type: 'تقرير تقييم أولي', period: 'سبتمبر 2026', score: 64, change: '—', sessions: 4, status: 'مراجعة', tone: 'purple' },
  { id: 4, patient: 'ليان خالد', type: 'تقرير منتصف الخطة', period: 'أغسطس–سبتمبر 2026', score: 71, change: '+11%', sessions: 14, status: 'جاهز', tone: 'orange' },
  { id: 5, patient: 'عمر يوسف', type: 'ملخص جلسات', period: 'سبتمبر 2026', score: 69, change: '+4%', sessions: 8, status: 'جاهز', tone: 'green' },
];

const trend = [
  { label: 'أبريل', value: 62 },
  { label: 'مايو', value: 66 },
  { label: 'يونيو', value: 68 },
  { label: 'يوليو', value: 72 },
  { label: 'أغسطس', value: 75 },
  { label: 'سبتمبر', value: 78 },
];

const reportStats = [
  { label: 'تقارير هذا الشهر', value: '38', note: 'تم إنشاؤها', icon: FileText, tone: 'blue' },
  { label: 'متوسط التحسن', value: '+7.4%', note: 'مقارنة بالشهر السابق', icon: TrendingUp, tone: 'teal' },
  { label: 'مرضى بتحسن', value: '86%', note: 'من المرضى النشطين', icon: CheckCircle2, tone: 'green' },
  { label: 'تقارير تحتاج مراجعة', value: '4', note: 'قبل الإرسال', icon: Filter, tone: 'orange' },
];

export default function Reports() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('الكل');
  const [selectedId, setSelectedId] = useState(1);

  const filtered = useMemo(() => reportRows.filter((row) => {
    const matchesStatus = status === 'الكل' || row.status === status;
    const haystack = `${row.patient} ${row.type} ${row.period}`;
    return matchesStatus && haystack.includes(query.trim());
  }), [query, status]);

  const selected = reportRows.find((row) => row.id === selectedId) || reportRows[0];

  const printReport = () => window.print();

  return (
    <div className="reports-page">
      <div className="page-intro reports-intro">
        <div>
          <div className="breadcrumb">التقارير</div>
          <h1>التقارير</h1>
          <p>إنشاء ومراجعة تقارير تقدم المرضى ومتابعة التغير في الأداء المعرفي.</p>
        </div>
        <div className="report-actions">
          <button className="secondary-button" onClick={printReport}><Printer size={15} /> طباعة</button>
          <button className="primary-button"><FileText size={15} /> تقرير جديد</button>
        </div>
      </div>

      <div className="report-stats">
        {reportStats.map(({ label, value, note, icon: Icon, tone }) => (
          <div className="report-stat" key={label}>
            <span className={`report-stat-icon ${tone}`}><Icon size={18} /></span>
            <div><span>{label}</span><strong>{value}</strong><small>{note}</small></div>
          </div>
        ))}
      </div>

      <div className="reports-overview-grid">
        <section className="panel report-trend-panel">
          <div className="panel-heading">
            <div><h2>تطور متوسط الأداء</h2><p>متوسط النتائج عبر آخر 6 أشهر للمرضى النشطين.</p></div>
            <div className="report-period"><CalendarDays size={13} /> آخر 6 أشهر</div>
          </div>
          <div className="report-chart">
            <div className="chart-y-labels"><span>100%</span><span>80%</span><span>60%</span><span>40%</span></div>
            <div className="report-bars">
              <div className="chart-grid-lines"><i/><i/><i/><i/></div>
              {trend.map((item) => (
                <div className="report-bar-column" key={item.label}>
                  <span className="report-bar-value">{item.value}%</span>
                  <div className="report-bar-track"><b style={{ height: `${item.value}%` }} /></div>
                  <small>{item.label}</small>
                </div>
              ))}
            </div>
          </div>
          <div className="trend-foot"><span><i /> متوسط الأداء</span><strong>+16 نقطة منذ أبريل</strong></div>
        </section>

        <section className="panel report-domain-panel">
          <div className="panel-heading"><div><h2>الأداء حسب المجال</h2><p>آخر نتائج التقييمات المكتملة.</p></div><BarChart3 size={21} className="heading-blue-icon" /></div>
          <div className="report-domain-list">
            <DomainRow icon={Brain} title="الذاكرة" value={78} tone="blue" />
            <DomainRow icon={Target} title="الانتباه" value={84} tone="teal" />
            <DomainRow icon={Zap} title="سرعة الاستجابة" value={72} tone="orange" />
            <DomainRow icon={TrendingUp} title="الوظائف التنفيذية" value={69} tone="purple" />
          </div>
        </section>
      </div>

      <section className="panel reports-management">
        <div className="reports-toolbar">
          <div><h2>تقارير المرضى</h2><p>اختر تقريرًا لمعاينة الملخص قبل طباعته أو مشاركته.</p></div>
          <div className="reports-toolbar-controls">
            <div className="search-box report-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث باسم المريض أو التقرير..." /></div>
            <div className="session-filters report-filters">{['الكل', 'جاهز', 'مراجعة'].map((item) => <button key={item} onClick={() => setStatus(item)} className={status === item ? 'active' : ''}>{item}</button>)}</div>
          </div>
        </div>

        <div className="reports-table-wrap">
          <table className="reports-table">
            <thead><tr><th>المريض</th><th>نوع التقرير</th><th>الفترة</th><th>النتيجة</th><th>التغير</th><th>الجلسات</th><th>الحالة</th><th /></tr></thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.id} className={selectedId === row.id ? 'selected-report-row' : ''}>
                  <td><div className="report-patient"><span className={`report-avatar ${row.tone}`}><UserRound size={15} /></span><div><b>{row.patient}</b><small>ملف معرفي نشط</small></div></div></td>
                  <td><strong className="report-type">{row.type}</strong></td>
                  <td>{row.period}</td>
                  <td><b className="report-score">{row.score}%</b></td>
                  <td><span className={row.change === '—' ? 'neutral-change' : 'positive-change'}>{row.change}</span></td>
                  <td>{row.sessions}</td>
                  <td><span className={`report-status ${row.status === 'جاهز' ? 'ready' : 'review'}`}>{row.status}</span></td>
                  <td><button className="report-preview-button" onClick={() => setSelectedId(row.id)}>معاينة</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          {!filtered.length && <div className="empty-state">لا توجد تقارير مطابقة.</div>}
        </div>
      </section>

      <section className="report-preview panel">
        <div className="report-preview-header">
          <div><span className="preview-eyebrow">معاينة التقرير</span><h2>{selected.type}</h2><p>{selected.patient} · {selected.period}</p></div>
          <div className="preview-actions"><button className="secondary-button" onClick={printReport}><Printer size={14} /> طباعة</button><button className="preview-download"><Download size={14} /> تصدير</button></div>
        </div>
        <div className="report-preview-grid">
          <div className="preview-summary-card"><span>النتيجة الحالية</span><strong>{selected.score}%</strong><small>النتيجة العامة</small></div>
          <div className="preview-summary-card"><span>التغير</span><strong className="green-text">{selected.change}</strong><small>من التقييم السابق</small></div>
          <div className="preview-summary-card"><span>عدد الجلسات</span><strong>{selected.sessions}</strong><small>ضمن الفترة المحددة</small></div>
          <div className="preview-summary-card"><span>الحالة</span><strong className="status-word">{selected.status}</strong><small>آخر تحديث اليوم</small></div>
        </div>
        <div className="preview-note"><div className="preview-note-icon"><FileText size={17} /></div><div><b>ملخص المعالج</b><p>يظهر تحسن تدريجي في الأداء المعرفي، مع استجابة جيدة للتدريب المتكرر. يُنصح بالاستمرار على الخطة الحالية ومراجعة الأهداف في التقييم القادم.</p></div><ChevronLeft size={16} className="preview-arrow" /></div>
      </section>
    </div>
  );
}

function DomainRow({ icon: Icon, title, value, tone }) {
  return <div className="report-domain-row"><span className={`domain-icon ${tone}`}><Icon size={16} /></span><div className="domain-copy"><div><b>{title}</b><strong>{value}%</strong></div><div className="domain-progress"><span className={tone} style={{ width: `${value}%` }} /></div></div></div>;
}

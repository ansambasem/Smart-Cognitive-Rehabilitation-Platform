import { useMemo, useState } from 'react';
import {
  Activity,
  ArrowDownLeft,
  ArrowUpLeft,
  Brain,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';

const monthly = [
  { label: 'أبريل', score: 61, sessions: 92 },
  { label: 'مايو', score: 65, sessions: 96 },
  { label: 'يونيو', score: 68, sessions: 101 },
  { label: 'يوليو', score: 72, sessions: 108 },
  { label: 'أغسطس', score: 75, sessions: 113 },
  { label: 'سبتمبر', score: 79, sessions: 121 },
];

const patients = [
  { name: 'أحمد محمد', sessions: 12, score: 86, change: 12, domain: 'الذاكرة', tone: 'blue' },
  { name: 'سارة علي', sessions: 10, score: 81, change: 8, domain: 'الانتباه', tone: 'teal' },
  { name: 'ليان خالد', sessions: 14, score: 78, change: 11, domain: 'الوظائف التنفيذية', tone: 'purple' },
  { name: 'عمر يوسف', sessions: 8, score: 73, change: 5, domain: 'سرعة الاستجابة', tone: 'orange' },
  { name: 'محمد حسن', sessions: 6, score: 64, change: -2, domain: 'الانتباه', tone: 'green' },
];

const domains = [
  { title: 'الذاكرة', value: 78, change: 9, icon: Brain, tone: 'blue' },
  { title: 'الانتباه', value: 84, change: 12, icon: Target, tone: 'teal' },
  { title: 'سرعة الاستجابة', value: 72, change: 6, icon: Zap, tone: 'orange' },
  { title: 'الوظائف التنفيذية', value: 69, change: 4, icon: Activity, tone: 'purple' },
];

export default function Analytics() {
  const [period, setPeriod] = useState('6 أشهر');
  const [domain, setDomain] = useState('الكل');
  const [patientQuery, setPatientQuery] = useState('');

  const filteredPatients = useMemo(() => patients.filter((patient) => {
    const matchesDomain = domain === 'الكل' || patient.domain === domain;
    return matchesDomain && patient.name.includes(patientQuery.trim());
  }), [domain, patientQuery]);

  return (
    <div className="analytics-page">
      <div className="page-intro analytics-intro">
        <div>
          <div className="breadcrumb">التحليلات</div>
          <h1>التحليلات</h1>
          <p>نظرة شاملة على أداء المرضى واتجاهات التحسن عبر البرنامج العلاجي.</p>
        </div>
        <div className="analytics-controls">
          <label className="analytics-select"><CalendarDays size={14} /><select value={period} onChange={(e) => setPeriod(e.target.value)}><option>6 أشهر</option><option>3 أشهر</option><option>هذا الشهر</option></select></label>
          <button className="primary-button"><TrendingUp size={15} /> تحديث التحليل</button>
        </div>
      </div>

      <div className="analytics-kpis">
        <Kpi icon={Users} label="المرضى النشطون" value="128" note="+8 هذا الشهر" tone="blue" />
        <Kpi icon={TrendingUp} label="متوسط التحسن" value="+7.4%" note="مقارنة بالفترة السابقة" tone="teal" />
        <Kpi icon={CheckCircle2} label="نسبة الالتزام" value="91%" note="حضور الجلسات المجدولة" tone="green" />
        <Kpi icon={Clock3} label="جلسات مكتملة" value="121" note="من أصل 134 جلسة" tone="purple" />
      </div>

      <div className="analytics-main-grid">
        <section className="panel analytics-trend-panel">
          <div className="panel-heading">
            <div><h2>اتجاه الأداء والتحسن</h2><p>متوسط النتيجة العامة وعدد الجلسات المكتملة.</p></div>
            <span className="analytics-period-badge"><Activity size={13} /> {period}</span>
          </div>
          <div className="analytics-chart">
            <div className="analytics-y"><span>100%</span><span>80%</span><span>60%</span><span>40%</span></div>
            <div className="analytics-chart-area">
              <div className="analytics-grid-lines"><i/><i/><i/><i/></div>
              <div className="analytics-columns">
                {monthly.map((item) => <div className="analytics-column" key={item.label}>
                  <div className="analytics-value">{item.score}%</div>
                  <div className="analytics-bar"><b style={{ height: `${item.score}%` }} /></div>
                  <small>{item.label}</small>
                </div>)}
              </div>
            </div>
          </div>
          <div className="analytics-chart-footer"><span><i className="dot-blue"/> متوسط الأداء</span><span><i className="dot-teal"/> الجلسات: <b>121</b></span><strong><ArrowUpLeft size={13}/> +18 نقطة منذ أبريل</strong></div>
        </section>

        <section className="panel analytics-insights-panel">
          <div className="panel-heading"><div><h2>ملخص سريع</h2><p>أبرز المؤشرات الحالية.</p></div><CircleAlert size={20} className="analytics-heading-icon" /></div>
          <div className="insight-list">
            <Insight icon={TrendingUp} title="التحسن العام مستمر" text="ارتفع متوسط الأداء 7.4% خلال الفترة الحالية." tone="green" />
            <Insight icon={Target} title="الانتباه هو المجال الأعلى" text="متوسط الأداء الحالي 84% عبر التقييمات المكتملة." tone="teal" />
            <Insight icon={Clock3} title="الالتزام جيد" text="91% من الجلسات المجدولة تم حضورها أو إكمالها." tone="blue" />
            <Insight icon={CircleAlert} title="متابعة مطلوبة" text="5 ملفات تحتاج مراجعة بسبب انخفاض النتيجة الأخيرة." tone="orange" />
          </div>
        </section>
      </div>

      <section className="panel analytics-domains-panel">
        <div className="panel-heading"><div><h2>أداء المجالات المعرفية</h2><p>مقارنة النتائج الحالية مع الفترة السابقة.</p></div><button className="text-button">عرض التفاصيل <ChevronLeft size={13}/></button></div>
        <div className="analytics-domain-grid">
          {domains.map(({ title, value, change, icon: Icon, tone }) => <div className="analytics-domain-card" key={title}>
            <div className="analytics-domain-top"><span className={`analytics-domain-icon ${tone}`}><Icon size={18}/></span><span className="domain-change"><ArrowUpLeft size={11}/> +{change}%</span></div>
            <div className="analytics-domain-title"><b>{title}</b><strong>{value}%</strong></div>
            <div className="analytics-progress"><span className={tone} style={{ width: `${value}%` }}/></div>
            <small>متوسط آخر التقييمات</small>
          </div>)}
        </div>
      </section>

      <section className="panel analytics-patients-panel">
        <div className="analytics-table-toolbar">
          <div><h2>أداء المرضى</h2><p>قائمة مختصرة لمتابعة التغير في النتائج والالتزام.</p></div>
          <div className="analytics-table-controls">
            <div className="search-box analytics-search"><Users size={15}/><input value={patientQuery} onChange={(e) => setPatientQuery(e.target.value)} placeholder="ابحث عن مريض..." /></div>
            <select className="analytics-filter" value={domain} onChange={(e) => setDomain(e.target.value)}><option>الكل</option><option>الذاكرة</option><option>الانتباه</option><option>سرعة الاستجابة</option><option>الوظائف التنفيذية</option></select>
          </div>
        </div>
        <div className="analytics-table-wrap">
          <table className="analytics-table"><thead><tr><th>المريض</th><th>المجال الرئيسي</th><th>الجلسات</th><th>النتيجة</th><th>التغير</th><th>التقدم</th><th /></tr></thead>
            <tbody>{filteredPatients.map((patient) => <tr key={patient.name}>
              <td><div className="analytics-patient"><span className={`analytics-avatar ${patient.tone}`}>{patient.name.split(' ').map((n) => n[0]).join('').slice(0,2)}</span><b>{patient.name}</b></div></td>
              <td><span className="analytics-domain-name">{patient.domain}</span></td>
              <td>{patient.sessions}</td><td><b className="analytics-score">{patient.score}%</b></td>
              <td><span className={patient.change >= 0 ? 'analytics-positive' : 'analytics-negative'}>{patient.change >= 0 ? '+' : ''}{patient.change}%</span></td>
              <td><div className="mini-progress"><span style={{ width: `${patient.score}%` }}/></div></td>
              <td><button className="analytics-row-button">التفاصيل</button></td>
            </tr>)}</tbody></table>
          {!filteredPatients.length && <div className="empty-state">لا توجد نتائج مطابقة.</div>}
        </div>
      </section>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, note, tone }) {
  return <div className="analytics-kpi"><span className={`analytics-kpi-icon ${tone}`}><Icon size={19}/></span><div><span>{label}</span><strong>{value}</strong><small>{note}</small></div></div>;
}

function Insight({ icon: Icon, title, text, tone }) {
  return <div className="insight-row"><span className={`insight-icon ${tone}`}><Icon size={16}/></span><div><b>{title}</b><p>{text}</p></div></div>;
}

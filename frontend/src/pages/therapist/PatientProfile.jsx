import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Activity, ArrowRight, CalendarDays, CheckCircle2, Clock3,
  FileText, Play, Target, TrendingUp, UserRound
} from 'lucide-react';

const patients = [
  { id: 1, name: 'أحمد محمد', age: 42, condition: 'إصابة دماغية', level: 'متوسط', progress: 78, lastSession: 'اليوم، 10:00', status: 'مستقر', initials: 'أم', diagnosis: 'إصابة دماغية مكتسبة', joined: '12 أغسطس 2026' },
  { id: 2, name: 'سارة علي', age: 35, condition: 'ضعف الانتباه', level: 'متقدم', progress: 84, lastSession: 'أمس، 11:00', status: 'مستقر', initials: 'سع', diagnosis: 'اضطراب في الانتباه والتركيز', joined: '08 أغسطس 2026' },
  { id: 3, name: 'محمد حسن', age: 51, condition: 'تأهيل معرفي', level: 'مبتدئ', progress: 46, lastSession: 'أمس، 12:00', status: 'يحتاج متابعة', initials: 'مح', diagnosis: 'احتياج لبرنامج تأهيل معرفي', joined: '02 سبتمبر 2026' },
  { id: 4, name: 'ليان خالد', age: 29, condition: 'مشاكل الذاكرة', level: 'متوسط', progress: 66, lastSession: '28 سبتمبر، 09:30', status: 'مستقر', initials: 'لك', diagnosis: 'صعوبات في الذاكرة قصيرة المدى', joined: '19 أغسطس 2026' },
  { id: 5, name: 'عمر يوسف', age: 47, condition: 'سرعة الاستجابة', level: 'متوسط', progress: 39, lastSession: '27 سبتمبر، 13:00', status: 'يحتاج مراجعة', initials: 'عي', diagnosis: 'بطء في سرعة الاستجابة المعرفية', joined: '21 أغسطس 2026' },
  { id: 6, name: 'نور أحمد', age: 38, condition: 'الوظائف التنفيذية', level: 'متقدم', progress: 91, lastSession: '26 سبتمبر، 10:30', status: 'مستقر', initials: 'نأ', diagnosis: 'صعوبات في الوظائف التنفيذية', joined: '03 أغسطس 2026' },
  { id: 7, name: 'ياسر محمود', age: 56, condition: 'الانتباه والذاكرة', level: 'مبتدئ', progress: 52, lastSession: '25 سبتمبر، 11:30', status: 'يحتاج متابعة', initials: 'يم', diagnosis: 'تحديات في الانتباه والذاكرة', joined: '10 سبتمبر 2026' },
  { id: 8, name: 'ريم سامي', age: 32, condition: 'الإدراك البصري', level: 'متوسط', progress: 73, lastSession: '24 سبتمبر، 12:30', status: 'مستقر', initials: 'رس', diagnosis: 'صعوبات في الإدراك البصري', joined: '16 أغسطس 2026' },
];

const cognitive = [
  { label: 'الذاكرة', value: 82, icon: 'M' },
  { label: 'الانتباه', value: 74, icon: 'A' },
  { label: 'سرعة الاستجابة', value: 68, icon: 'R' },
  { label: 'حل المشكلات', value: 79, icon: 'P' },
];

const sessions = [
  { date: '30 سبتمبر 2026', time: '10:00', type: 'تدريب الذاكرة والانتباه', score: 86, result: 'مكتملة' },
  { date: '28 سبتمبر 2026', time: '10:30', type: 'الوظائف التنفيذية', score: 81, result: 'مكتملة' },
  { date: '25 سبتمبر 2026', time: '09:45', type: 'سرعة الاستجابة', score: 76, result: 'مكتملة' },
  { date: '22 سبتمبر 2026', time: '11:00', type: 'تقييم معرفي قصير', score: 72, result: 'مكتملة' },
];

export default function PatientProfile() {
  const { id } = useParams();
  const patient = useMemo(() => patients.find((p) => String(p.id) === id) || patients[0], [id]);

  return (
    <div className="patient-profile-page">
      <div className="profile-topbar">
        <div>
          <div className="breadcrumb">
            <Link to="/therapist/patients">المرضى</Link><ArrowRight size={13} /> ملف المريض
          </div>
          <h1>ملف المريض</h1>
        </div>
        <div className="profile-actions">
          <button className="secondary-button"><FileText size={16} /> التقرير</button>
          <button className="primary-button"><Play size={16} /> بدء جلسة</button>
        </div>
      </div>

      <section className="panel patient-hero">
        <div className="patient-identity">
          <div className="profile-avatar"><UserRound size={28} /></div>
          <div>
            <div className="identity-title"><h2>{patient.name}</h2><span className={`patient-status ${patient.status === 'مستقر' ? 'stable' : patient.status === 'يحتاج متابعة' ? 'follow' : 'review'}`}>{patient.status}</span></div>
            <p>{patient.diagnosis}</p>
            <span className="patient-id">رقم المريض #{String(patient.id).padStart(3, '0')}</span>
          </div>
        </div>
        <div className="hero-progress">
          <div><span>التقدم العام</span><strong>{patient.progress}%</strong></div>
          <div className="large-progress"><span style={{ width: `${patient.progress}%` }} /></div>
          <small>آخر تحديث بعد الجلسة الأخيرة</small>
        </div>
      </section>

      <div className="profile-grid">
        <section className="panel info-panel">
          <div className="section-heading"><div><h3>المعلومات الأساسية</h3><p>بيانات الحالة المسجلة في المنصة</p></div><UserRound size={19} /></div>
          <div className="info-grid">
            <div><span>العمر</span><b>{patient.age} سنة</b></div>
            <div><span>المستوى</span><b>{patient.level}</b></div>
            <div><span>التشخيص</span><b>{patient.condition}</b></div>
            <div><span>تاريخ التسجيل</span><b>{patient.joined}</b></div>
          </div>
        </section>

        <section className="panel treatment-card">
          <div className="section-heading"><div><h3>الخطة الحالية</h3><p>برنامج التأهيل المعرفي</p></div><Target size={19} /></div>
          <div className="plan-row"><div><strong>تحسين الذاكرة والانتباه</strong><span>3 جلسات أسبوعيًا</span></div><b>الأسبوع 6</b></div>
          <div className="plan-meta"><span><CheckCircle2 size={14} /> 14 جلسة مكتملة</span><span><CalendarDays size={14} /> الجلسة القادمة غدًا</span></div>
        </section>
      </div>

      <div className="profile-grid lower-grid">
        <section className="panel cognitive-panel">
          <div className="section-heading"><div><h3>الملف المعرفي</h3><p>آخر مؤشرات الأداء حسب المجال</p></div><Activity size={19} /></div>
          <div className="cognitive-list">
            {cognitive.map((item) => (
              <div className="cognitive-item" key={item.label}>
                <div className="cognitive-title"><span className="cognitive-icon">{item.icon}</span><b>{item.label}</b><strong>{item.value}%</strong></div>
                <div className="cognitive-track"><span style={{ width: `${item.value}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel trend-panel">
          <div className="section-heading"><div><h3>التقدم</h3><p>تطور الأداء خلال الأسابيع الأخيرة</p></div><TrendingUp size={19} /></div>
          <div className="mini-chart">
            {[48, 55, 53, 64, 69, 74, 78].map((v, i) => <div className="chart-column" key={i}><span style={{ height: `${v}%` }} /><small>{i + 1}</small></div>)}
          </div>
          <div className="trend-summary"><strong>+18%</strong><span>تحسن منذ بداية البرنامج</span></div>
        </section>
      </div>

      <section className="panel sessions-panel">
        <div className="section-heading"><div><h3>آخر الجلسات</h3><p>سجل الجلسات والنتائج الأخيرة</p></div><Link to="/therapist/sessions">عرض الكل</Link></div>
        <div className="sessions-table-wrap">
          <table className="sessions-table">
            <thead><tr><th>التاريخ</th><th>الوقت</th><th>نوع الجلسة</th><th>النتيجة</th><th>الحالة</th></tr></thead>
            <tbody>{sessions.map((s) => <tr key={`${s.date}-${s.time}`}><td>{s.date}</td><td><Clock3 size={14} /> {s.time}</td><td>{s.type}</td><td><b className="session-score">{s.score}%</b></td><td><span className="completed-pill"><CheckCircle2 size={13} /> {s.result}</span></td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

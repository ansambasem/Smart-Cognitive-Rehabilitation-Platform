import { useState } from 'react';
import { Bell, Check, ChevronLeft, Clock3, LockKeyhole, Palette, Save, ShieldCheck, UserRound } from 'lucide-react';

const sections = [
  { id: 'profile', label: 'الملف الشخصي', icon: UserRound },
  { id: 'notifications', label: 'الإشعارات', icon: Bell },
  { id: 'security', label: 'الأمان والخصوصية', icon: ShieldCheck },
  { id: 'appearance', label: 'المظهر', icon: Palette },
];

export default function Settings() {
  const [active, setActive] = useState('profile');
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState(true);
  const [sessions, setSessions] = useState(true);
  const [reports, setReports] = useState(true);
  const [compact, setCompact] = useState(false);

  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="settings-page">
      <div className="page-intro settings-intro">
        <div><h1>الإعدادات</h1><p>تحكم في بيانات الحساب والإشعارات والمظهر من مكان واحد.</p></div>
        <button className="primary-button" onClick={save}><Save size={16}/> حفظ التغييرات</button>
      </div>

      {saved && <div className="save-toast"><Check size={16}/> تم حفظ التغييرات بنجاح</div>}

      <div className="settings-layout">
        <aside className="panel settings-nav">
          <div className="settings-user"><div className="settings-avatar">د</div><div><strong>د. أحمد محمد</strong><span>معالج معرفي</span></div></div>
          <div className="settings-nav-list">{sections.map(({ id, label, icon: Icon }) => <button key={id} className={active === id ? 'active' : ''} onClick={() => setActive(id)}><Icon size={17}/><span>{label}</span><ChevronLeft size={14}/></button>)}</div>
        </aside>

        <section className="panel settings-content">
          {active === 'profile' && <>
            <div className="settings-section-heading"><div><h2>الملف الشخصي</h2><p>المعلومات الأساسية التي تظهر داخل المنصة.</p></div><span className="settings-badge"><ShieldCheck size={13}/> حساب موثّق</span></div>
            <div className="settings-form-grid">
              <label><span>الاسم الكامل</span><input defaultValue="د. أحمد محمد" /></label>
              <label><span>المسمى الوظيفي</span><input defaultValue="معالج معرفي" /></label>
              <label><span>البريد الإلكتروني</span><input defaultValue="ahmad@example.com" type="email" /></label>
              <label><span>رقم الهاتف</span><input defaultValue="059 000 0000" /></label>
              <label className="full"><span>نبذة مختصرة</span><textarea defaultValue="معالج متخصص في برامج التأهيل المعرفي ومتابعة تقدم المرضى." rows="4" /></label>
            </div>
          </>}

          {active === 'notifications' && <>
            <div className="settings-section-heading"><div><h2>إعدادات الإشعارات</h2><p>اختر التنبيهات التي تريد استقبالها أثناء العمل.</p></div><Bell size={22} className="settings-heading-icon"/></div>
            <div className="settings-option-list">
              <Toggle title="تنبيهات البريد الإلكتروني" text="استقبال ملخصات وتحديثات مهمة على البريد." value={email} onChange={setEmail}/>
              <Toggle title="تذكير الجلسات" text="تنبيه قبل بدء الجلسات المجدولة." value={sessions} onChange={setSessions}/>
              <Toggle title="جاهزية التقارير" text="تنبيه عند اكتمال تقرير يحتاج إلى مراجعة." value={reports} onChange={setReports}/>
            </div>
            <div className="settings-info"><Clock3 size={17}/><div><strong>توقيت التذكيرات</strong><span>يتم إرسال تذكير الجلسة قبل 30 دقيقة من الموعد.</span></div><select defaultValue="30"><option value="15">15 دقيقة</option><option value="30">30 دقيقة</option><option value="60">ساعة</option></select></div>
          </>}

          {active === 'security' && <>
            <div className="settings-section-heading"><div><h2>الأمان والخصوصية</h2><p>إدارة خيارات حماية الحساب وبيانات المرضى.</p></div><LockKeyhole size={22} className="settings-heading-icon"/></div>
            <div className="security-cards"><div><ShieldCheck size={18}/><strong>حماية بيانات المرضى</strong><p>الوصول إلى ملفات المرضى مخصص للحسابات المصرح لها.</p><span>مفعّل</span></div><div><LockKeyhole size={18}/><strong>كلمة المرور</strong><p>آخر تحديث لكلمة المرور كان قبل 24 يومًا.</p><button className="outline-button">تغيير كلمة المرور</button></div></div>
            <div className="settings-info"><ShieldCheck size={17}/><div><strong>جلسات تسجيل الدخول</strong><span>الجهاز الحالي هو الجهاز النشط للحساب.</span></div><button className="text-button">عرض الأجهزة</button></div>
          </>}

          {active === 'appearance' && <>
            <div className="settings-section-heading"><div><h2>المظهر</h2><p>خصّص طريقة عرض المنصة بما يناسب أسلوب عملك.</p></div><Palette size={22} className="settings-heading-icon"/></div>
            <div className="theme-preview"><div className="theme-card selected"><div className="theme-mini-sidebar"/><div className="theme-mini-content"><i/><i/><i/></div><b>الوضع الفاتح</b><span>المظهر الحالي</span></div><div className="theme-card disabled"><div className="theme-mini-sidebar dark"/><div className="theme-mini-content dark"><i/><i/><i/></div><b>الوضع الداكن</b><span>متاح لاحقًا</span></div></div>
            <Toggle title="عرض أكثر اختصارًا" text="تقليل المسافات الداخلية لعرض معلومات أكثر في الشاشة." value={compact} onChange={setCompact}/>
          </>}
        </section>
      </div>
    </div>
  );
}

function Toggle({ title, text, value, onChange }) {
  return <div className="settings-toggle-row"><div><strong>{title}</strong><p>{text}</p></div><button className={`toggle ${value ? 'on' : ''}`} onClick={() => onChange(!value)} aria-label={title}><span/></button></div>;
}

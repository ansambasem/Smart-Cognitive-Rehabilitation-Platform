import { useMemo, useState } from 'react';
import {
  Brain, CheckCircle2, Clock3, Eye, Filter, Gamepad2, Grid2X2,
  Lightbulb, Play, Search, Sparkles, Target, Zap
} from 'lucide-react';

const categories = [
  { id: 'الكل', label: 'كل التمارين', count: 24, icon: Grid2X2, tone: 'blue' },
  { id: 'الذاكرة', label: 'الذاكرة', count: 7, icon: Brain, tone: 'purple' },
  { id: 'الانتباه', label: 'الانتباه', count: 6, icon: Eye, tone: 'teal' },
  { id: 'سرعة الاستجابة', label: 'سرعة الاستجابة', count: 5, icon: Zap, tone: 'orange' },
  { id: 'حل المشكلات', label: 'حل المشكلات', count: 6, icon: Lightbulb, tone: 'green' },
];

const exercises = [
  { id: 1, title: 'تذكر التسلسل', category: 'الذاكرة', level: 'متوسط', duration: '8 دقائق', completion: 82, description: 'تذكر ترتيب العناصر ثم إعادة بنائها بالترتيب الصحيح.', tone: 'purple' },
  { id: 2, title: 'صيد الهدف', category: 'الانتباه', level: 'مبتدئ', duration: '6 دقائق', completion: 91, description: 'حدد الهدف الصحيح وسط مجموعة من المحفزات المتشابهة.', tone: 'teal' },
  { id: 3, title: 'استجابة سريعة', category: 'سرعة الاستجابة', level: 'متوسط', duration: '5 دقائق', completion: 74, description: 'استجب للمحفزات البصرية بأسرع وقت مع الحفاظ على الدقة.', tone: 'orange' },
  { id: 4, title: 'ترتيب الخطوات', category: 'حل المشكلات', level: 'متقدم', duration: '10 دقائق', completion: 63, description: 'رتب خطوات الحل للوصول إلى النتيجة بأقل عدد من المحاولات.', tone: 'green' },
  { id: 5, title: 'مطابقة الوجوه والرموز', category: 'الذاكرة', level: 'متوسط', duration: '7 دقائق', completion: 79, description: 'اربط بين الوجوه والرموز وتذكر الأزواج الصحيحة.', tone: 'purple' },
  { id: 6, title: 'المسار البصري', category: 'الانتباه', level: 'متقدم', duration: '9 دقائق', completion: 68, description: 'تابع المسار المطلوب وتجنب المشتتات البصرية.', tone: 'teal' },
];

export default function Exercises() {
  const [category, setCategory] = useState('الكل');
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => exercises.filter((item) =>
    (category === 'الكل' || item.category === category) &&
    `${item.title} ${item.category}`.includes(query.trim())
  ), [category, query]);

  return (
    <div className="exercises-page">
      <div className="page-intro exercises-intro">
        <div>
          <div className="breadcrumb">التمارين</div>
          <h1>مكتبة التمارين</h1>
          <p>اختيار وإدارة التمارين المعرفية المناسبة لكل مريض ومجال.</p>
        </div>
        <button className="primary-button"><Sparkles size={16} /> إنشاء تمرين مخصص</button>
      </div>

      <div className="exercise-stats">
        <div className="exercise-stat blue"><span>إجمالي التمارين</span><strong>24</strong><small>في مكتبة المنصة</small><Grid2X2 size={19} /></div>
        <div className="exercise-stat teal"><span>الذاكرة والانتباه</span><strong>13</strong><small>تمرين متاح</small><Brain size={19} /></div>
        <div className="exercise-stat orange"><span>قيد التطوير</span><strong>5</strong><small>تمارين جديدة</small><Gamepad2 size={19} /></div>
        <div className="exercise-stat green"><span>متوسط الإكمال</span><strong>79%</strong><small>آخر 30 يومًا</small><Target size={19} /></div>
      </div>

      <div className="exercise-categories">
        {categories.map(({ id, label, count, icon: Icon, tone }) => (
          <button key={id} onClick={() => setCategory(id)} className={`exercise-category ${tone} ${category === id ? 'active' : ''}`}>
            <span className="category-icon"><Icon size={18} /></span>
            <span><b>{label}</b><small>{count} تمارين</small></span>
          </button>
        ))}
      </div>

      <section className="panel exercise-library">
        <div className="exercise-toolbar">
          <div>
            <div className="section-heading compact-heading"><div><h3>التمارين المتاحة</h3><p>اختر تمرينًا لبدء جلسة أو إضافته إلى خطة المريض</p></div><DumbbellIcon /></div>
          </div>
          <div className="exercise-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="ابحث عن تمرين..." /></div>
          <button className="filter-outline"><Filter size={14} /> تصفية</button>
        </div>

        <div className="exercise-grid">
          {filtered.map((item) => (
            <article className="exercise-card" key={item.id}>
              <div className={`exercise-card-top ${item.tone}`}>
                <span className="exercise-symbol"><Gamepad2 size={22} /></span>
                <span className="level-badge">{item.level}</span>
              </div>
              <div className="exercise-card-body">
                <div className="exercise-category-label">{item.category}</div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
                <div className="exercise-meta"><span><Clock3 size={14} /> {item.duration}</span><span><CheckCircle2 size={14} /> {item.completion}% إكمال</span></div>
                <div className="exercise-progress"><span style={{ width: `${item.completion}%` }} /></div>
                <button className="exercise-start"><Play size={14} /> استخدام التمرين</button>
              </div>
            </article>
          ))}
        </div>
        {!filtered.length && <div className="empty-state">لا توجد تمارين مطابقة للبحث الحالي.</div>}
      </section>
    </div>
  );
}

function DumbbellIcon() {
  return <Zap size={19} />;
}

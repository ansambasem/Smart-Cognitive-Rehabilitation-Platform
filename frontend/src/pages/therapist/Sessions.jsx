import { useMemo, useState } from 'react';
import { CalendarDays, CheckCircle2, Clock3, Filter, Play, Search, UserRound } from 'lucide-react';

const sessions = [
  {id:1,patient:'أحمد محمد',type:'تدريب الذاكرة والانتباه',date:'30 سبتمبر 2026',time:'10:00',duration:'35 دقيقة',score:86,status:'مكتملة'},
  {id:2,patient:'سارة علي',type:'تمارين الانتباه الانتقائي',date:'30 سبتمبر 2026',time:'11:00',duration:'30 دقيقة',score:91,status:'مكتملة'},
  {id:3,patient:'محمد حسن',type:'تقييم معرفي قصير',date:'30 سبتمبر 2026',time:'12:00',duration:'25 دقيقة',score:null,status:'مجدولة'},
  {id:4,patient:'ليان خالد',type:'تدريب الذاكرة العاملة',date:'01 أكتوبر 2026',time:'09:30',duration:'35 دقيقة',score:null,status:'مجدولة'},
  {id:5,patient:'عمر يوسف',type:'سرعة الاستجابة',date:'01 أكتوبر 2026',time:'11:30',duration:'30 دقيقة',score:null,status:'مجدولة'},
  {id:6,patient:'نور أحمد',type:'الوظائف التنفيذية',date:'02 أكتوبر 2026',time:'10:30',duration:'40 دقيقة',score:88,status:'مكتملة'},
];

export default function Sessions(){
 const [query,setQuery]=useState(''); const [filter,setFilter]=useState('الكل');
 const filtered=useMemo(()=>sessions.filter(s=>(filter==='الكل'||s.status===filter)&&`${s.patient} ${s.type}`.includes(query.trim())),[query,filter]);
 return <div className="sessions-page">
  <div className="page-intro sessions-intro"><div><div className="breadcrumb">الجلسات</div><h1>الجلسات</h1><p>إدارة الجلسات المجدولة ومتابعة نتائج جلسات المرضى.</p></div><button className="primary-button"><Play size={16}/> بدء جلسة جديدة</button></div>
  <div className="session-stats">
   <div><span>جلسات اليوم</span><strong>3</strong><small>جلستان مكتملتان</small></div><div><span>مجدولة</span><strong>12</strong><small>خلال هذا الأسبوع</small></div><div><span>مكتملة هذا الشهر</span><strong>48</strong><small>من أصل 55 جلسة</small></div><div><span>متوسط النتيجة</span><strong>84%</strong><small>آخر 30 يومًا</small></div>
  </div>
  <section className="panel sessions-management">
   <div className="session-toolbar"><div className="search-box"><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="ابحث باسم المريض أو نوع الجلسة..."/></div><div className="session-filters">{['الكل','مجدولة','مكتملة'].map(f=><button key={f} onClick={()=>setFilter(f)} className={filter===f?'active':''}><Filter size={13}/>{f}</button>)}</div></div>
   <div className="sessions-full-table-wrap"><table className="sessions-full-table"><thead><tr><th>المريض</th><th>نوع الجلسة</th><th>التاريخ</th><th>الوقت</th><th>المدة</th><th>النتيجة</th><th>الحالة</th><th></th></tr></thead><tbody>{filtered.map(s=><tr key={s.id}><td><div className="session-patient"><span className="session-avatar"><UserRound size={15}/></span><b>{s.patient}</b></div></td><td>{s.type}</td><td><CalendarDays size={14}/>{s.date}</td><td><Clock3 size={14}/>{s.time}</td><td>{s.duration}</td><td>{s.score?<b className="session-score">{s.score}%</b>:<span className="muted-dash">—</span>}</td><td><span className={`session-status ${s.status==='مكتملة'?'done':'scheduled'}`}>{s.status==='مكتملة'?<CheckCircle2 size={13}/>:<Clock3 size={13}/>} {s.status}</span></td><td><button className="session-more">•••</button></td></tr>)}</tbody></table>{!filtered.length&&<div className="empty-state">لا توجد جلسات مطابقة.</div>}</div>
   <div className="table-footer"><span>عرض {filtered.length} جلسة</span><span>آخر تحديث: اليوم</span></div>
  </section>
 </div>
}

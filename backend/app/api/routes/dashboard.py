from fastapi import APIRouter
router=APIRouter(prefix='/therapist',tags=['Therapist'])
@router.get('/dashboard')
def therapist_dashboard():
    return {'stats':{'totalPatients':24,'todaySessions':8,'needsReview':3,'averageImprovement':12},'patientStatus':{'stable':14,'followUp':7,'review':3},'todaySessions':[],'aiRecommendations':[]}

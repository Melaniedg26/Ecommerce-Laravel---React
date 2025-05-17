export const apiUrl='http://localhost:8000/api'
export const adminToken=()=>{
      const data = localStorage.getItem('adminInfo');
    if (!data) return null;
    
    try {
        const parsed = JSON.parse(data);
        return parsed.token;
    } catch (error) {
        console.error('Error parsing adminInfo:', error);
        return null;
    }
}
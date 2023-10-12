import { myAxios } from "./helper";

export const register=(user)=>{
return myAxios
    .post('http://localhost:8008/register',user)
    .then((response) => response.data);
};

export const submitIncident=(user)=>{
    return myAxios
        .post('http://localhost:8008/incident',user)
        .then((response) => response.data);
};
export const login = (user) => {
    return myAxios
        .post('http://localhost:8008/', user)
        .then((response) => response.data);
};

export const getIncidentList = (email) => {
  return myAxios
    .get(`http://localhost:8008/incidents/${email}`)
    .then((response) => response.data);
};
export const getAssignedIncident = (name) => {
    return myAxios
      .get(`http://localhost:8008/support/${name}`)
      .then((response) => response.data);
  };
export const getIncidents = () => {
    return myAxios
      .get(`http://localhost:8008/support`)
      .then((response) => response.data);
  };
  export const updateIncidents = (id,updatedData) => {
    return myAxios
      .put(`http://localhost:8008/incidents/assign/${id}`,updatedData)
      .then((response) => response.data);
  };
  export const getname = (email) => {
    return myAxios
      .get(`http://localhost:8008/Empname/${email}`)
      .then((response) => response.data);
  };
  export const getnamegeneral = (email) => {
    return myAxios
      .get(`http://localhost:8008/IncidentEmail/${email}`)
      .then((response) => response.data);
  };
  export const getsupport = () => {
    return myAxios
      .get(`http://localhost:8008/admin/getsupport`)
      .then((response) => response.data);
  };

  export const getCount = () => {
    return myAxios
      .get(`http://localhost:8008/count`)
      .then((response) => response.data);
  };

  export const getIncidentCountsByEmail = (email) => {
    return myAxios
      .get(`http://localhost:8008/incident-counts/${email}`)
      .then((response) => response.data);
  };


  export const getIncidentsByWeek = () => {
    return myAxios
      .get('http://localhost:8008/incidents-by-week')
      .then((response) => response.data);
  };

  export const getIncidentPriorityCounts = () => {
    return myAxios
      .get('http://localhost:8008/incident-priority-count')
      .then((response) => response.data);
  };

  export const getEmployeeIncidentPriorityCounts = (email) => {
    return myAxios
      .get(`http://localhost:8008/employee-incident-priority-count/${email}`)
      .then((response) => response.data);
  };

 
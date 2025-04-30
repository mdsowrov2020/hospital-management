const endpoints = {
  auth: {
    base: "/auth",
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    admin: {
      register: "/auth/admin/register",
    },
  },
  users: {
    base: "/users",
    list: "/users",
    detail: (id: string) => `/users/${id}`,
  },
  patients: {
    base: "/patients",
    list: "/patients",
    detail: (id: string) => `/patients/${id}`,
  },
  doctors: {
    base: "/doctors",
    list: "/doctors",
    detail: (id: string) => `/doctors/${id}`,
  },
  appointments: {
    base: "/appointments",
    list: "/appointments",
    detail: (id: string) => `/appointments/${id}`,
  },
  medicalRecords: {
    base: "/medical-records",
    list: "/medical-records",
    detail: (id: string) => `/medical-records/${id}`,
  },
};

export default endpoints;

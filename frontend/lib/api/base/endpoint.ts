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
    create: "/patients",
    detail: (id: string) => `/patients/${id}`,
    update: (id: string) => `/patients/${id}`,
  },
  doctors: {
    base: "/doctors",
    list: "/doctors",
    create: "/doctors",
    detail: (id: string) => `/doctors/${id}`,
    update: (id: string) => `/doctors/${id}`,
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
  profile: {
    get: "/profile",
    update: "/profile",
  },
};

export default endpoints;

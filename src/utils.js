// Rutas simples para usar con createPageUrl
const routes = {
  Home: '/',
  Dashboard: '/dashboard',
};

export function createPageUrl(name) {
  return routes[name] || '/';
}

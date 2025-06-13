import '../styles/styles.css';
import '../styles/responsives.css';
import 'tiny-slider/dist/tiny-slider.css';
import App from './pages/app';
import { registerServiceWorker } from './utils';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.getElementById('main-content'),
    drawerButton: document.getElementById('drawer-button'),
    drawerNavigation: document.getElementById('navigation-drawer'),
    skipLinkButton: document.getElementById('skip-link'),
  });
  await app.renderPage();

  await registerServiceWorker();
  console.log('Berhasil mendaftarkan service worker.');

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});

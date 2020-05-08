import './main-app';
import './styles/index.scss';

const root = document.getElementById('app');
root.innerHTML = '';
root.appendChild(document.createElement('main-app'))

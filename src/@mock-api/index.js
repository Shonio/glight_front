import './api/dashboard-api';
import './api/auth-api';
import history from '../@history';
import axios from 'axios';
import mock from './mock';

mock.onAny().passThrough();

if (module?.hot?.status() === 'apply') {
  const { pathname } = history.location;
  history.push('/loading');
  history.push({ pathname });
}

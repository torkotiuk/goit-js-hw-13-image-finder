import { alert, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

function catchSpace() {
  alert({
    text: 'Enter smth to find your query!',
    delay: 4000,
  });
}

function isNotCorrectQuery() {
  error({
    text: `Your query isn't correct, please type appropriate search!`,
    delay: 4000,
  });
}

export default { catchSpace, isNotCorrectQuery };

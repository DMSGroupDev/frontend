import LocalizedStrings from 'react-localization';
import en from './en';
import cz from './cz';

console.log(en);
export default new LocalizedStrings({
    en: en[0],
    cz: cz[0]
   });
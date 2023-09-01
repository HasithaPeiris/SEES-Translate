import { specialConsonants,
    specialConsonantsUni,
    specialCharUni,
    specialChar,
    consonants,
    consonantsUni,
    vowels,
    vowelsUni,
    vowelModifiersUni,
    nVowels } from './sinhalaLetters.js';

const SinglishTranslate = (text) => {

    // Special consonants
    for (let i = 0; i < specialConsonants.length; i++) {
        text = text.replace(new RegExp(specialConsonants[i], 'g'), specialConsonantsUni[i]);
    }

    // Consonants + special
    for (let i = 0; i < specialCharUni.length; i++) {
        for (let j = 0; j < consonants.length; j++) {
            const s = consonants[j] + specialChar[i];
            const v = consonantsUni[j] + specialCharUni[i];
            const r = new RegExp(s, 'g');
            text = text.replace(r, v);
        }
    }

    // Consonants + Rakaransha + vowel modifiers
    for (let j = 0; j < consonants.length; j++) {
        for (let i = 0; i < vowels.length; i++) {
            const s = consonants[j] + 'r' + vowels[i];
            const v = consonantsUni[j] + '්‍ර' + vowelModifiersUni[i];
            const r = new RegExp(s, 'g');
            text = text.replace(r, v);
        }
        const s = consonants[j] + 'r';
        const v = consonantsUni[j] + '්‍ර';
        const r = new RegExp(s, 'g');
        text = text.replace(r, v);
    }


    // Consonants with vowels modifiers
    for (let i = 0; i < consonants.length; i++) {
        for (let j = 0; j < nVowels; j++) {
            const s = consonants[i] + vowels[j];
            const v = consonantsUni[i] + vowelModifiersUni[j];
            const r = new RegExp(s, 'g');
            text = text.replace(r, v);
        }
    }

    // Hal kirima
    for (let i = 0; i < consonants.length; i++) {
        const r = consonants[i];
        text = text.replace(new RegExp(r, 'g'), consonantsUni[i] + '්');
    }

    // Adding vowels
    for (let i = 0; i < vowels.length; i++) {
        const r = vowels[i];
        text = text.replace(new RegExp(r, 'g'), vowelsUni[i]);
    }

    return text;
};

export default SinglishTranslate;
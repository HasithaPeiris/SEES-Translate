import React, { useState } from 'react'
import "./translate.css"
import SinglishTranslate from "./singlishTranslate"

function Translate() {

    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('si');
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const [singlishInput, setSinglishInput] = useState(''); // Singlish input
    const [translatedSinglishText, setTranslatedSinglishText] = useState(''); // Singlish translation

    // Singlish Translation
    const handleSinglishInputChange = (event) => {
        const newInput = event.target.value;
        setSinglishInput(newInput);

        // Perform translation and update translatedText state
        const newTranslatedText = SinglishTranslate(newInput);
        setTranslatedSinglishText(newTranslatedText);
    };

    // Translation function
    const handleTranslation = () => {
        const inputLanguageCode = inputLang;
        const outputLanguageCode = outputLang;

        // API URL
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguageCode}&tl=${outputLanguageCode}&dt=t&q=${encodeURI(
            inputText
        )}`;

        fetch(url)
            .then((response) => response.json())
            .then((json) => {
                const translatedText = json[0].map((item) => item[0]).join("");
                setTranslatedText(translatedText); // Update React state with translated text
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputLangChange = (event) => {
        const selectedLang = event.target.value;
        setInputLang(selectedLang);
    };

    const handleOutputLangChange = (event) => {
        setOutputLang(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
        handleTranslation();
    };

    const handleSwapLanguages = () => {
        // Swap input and output languages
        const tempInputLang = inputLang;
        setInputLang(outputLang);
        setOutputLang(tempInputLang);

        // Swap input and output text values
        const translationInputElement = document.getElementById('translation-input');
        const translationOutputElement = document.getElementById('translation-output');

        const tempInputText = translationInputElement.value;
        translationInputElement.value = translationOutputElement.value;
        translationOutputElement.value = tempInputText;
    };

  return (
    <div className='translator-container'>
        <div className="language-selector">
            <select className="language-dropdown" value={inputLang} onChange={handleInputLangChange}>
                <option value="en">English</option>
                <option value="si">සිංහල</option>
            </select>
            <div className="swap-position">
                <ion-icon name="swap-horizontal-outline" onClick={handleSwapLanguages}></ion-icon>
            </div>
            <select className="language-dropdown" value={outputLang} onChange={handleOutputLangChange}>
                <option value="si">සිංහල</option>
                <option value="en">English</option>
            </select>
        </div>

        <div
            className="translation-boxes"
            style={{
                flexDirection: inputLang === 'si' ? 'column' : 'row',
                width: inputLang === 'si' ? '40%' : '80%',
                transition: 'all 0.3s ease-in-out',
            }}>
            {inputLang === 'si' && (
                <div className="input-box">
                    <textarea
                        placeholder="Singlish වලින් ලියන්න..."
                        autoFocus
                        value={singlishInput}
                        onChange={handleSinglishInputChange}
                    />
                </div>
            )}

            <div className="input-box"> 
                <textarea
                    id='translation-input'
                    placeholder={`Enter text in ${inputLang === 'si' ? 'Sinhala...' : 'English...'}`}
                    value={inputLang === 'si' ? translatedSinglishText : inputText}
                    onChange={handleInputChange}
                />
            </div>

            <div className="output-box">
                <textarea
                    id='translation-output'
                    placeholder={`Translated text in ${outputLang === 'si' ? 'Sinhala' : 'English'}`}
                    value={translatedText}
                    readOnly
                />
            </div>
        </div>

        <div className='mode'>
            <label htmlFor="dark-mode-btn" className="toggle">
                <div className="toggle-track">
                    <input type="checkbox"
                        className="toggle-checkbox"
                        id="dark-mode-btn"
                        />
                    <ion-icon name="sunny-outline"></ion-icon>
                    <ion-icon name="moon-outline"></ion-icon>
                    <span className="toggle-thumb"></span>
                </div>
            </label>
        </div>

        {/* <button onClick={handleTranslation}>Translate</button> */}
    </div>
  )
}

export default Translate
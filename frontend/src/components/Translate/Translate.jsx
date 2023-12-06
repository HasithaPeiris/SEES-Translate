import React, { useState } from 'react'
import "./translate.css"
import SinglishTranslate from "./singlishTranslate"

function Translate() {

    const [inputLang, setInputLang] = useState('en');
    const [outputLang, setOutputLang] = useState('si');
    const [showTextInput, setShowTextInput] = useState(false);
    const [inputText, setInputText] = useState('');
    const [translatedText, setTranslatedText] = useState('');

    const [singlishInput, setSinglishInput] = useState(''); // Singlish input
    const [translatedSinglishText, setTranslatedSinglishText] = useState(''); // Singlish translation

    const [isDarkMode, setIsDarkMode] = useState(false);

    // Singlish Translation
    const handleSinglishInputChange = (event) => {
        const newInput = event.target.value;
        setSinglishInput(newInput);

        // Perform translation and update translatedText state
        const newTranslatedText = SinglishTranslate(newInput);
        setTranslatedSinglishText(newTranslatedText);
    };

    const handleInputLangChange = (event) => {
        const selectedLang = event.target.value;
        setInputLang(selectedLang);
        setShowTextInput(selectedLang === 'si');
    };

    const handleOutputLangChange = (event) => {
        setOutputLang(event.target.value);
    };

    const handleInputChange = (event) => {
        setInputText(event.target.value);
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

    const handleDarkModeChange = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleTranslation = () => {
        // Implement your translation logic here
        setTranslatedText(inputText);
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
                        onChange={handleDarkModeChange}/>
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
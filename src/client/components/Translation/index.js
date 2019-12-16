import React, {Component} from 'react';
import {Input} from 'antd'
import './index.scss';
import {isoLangs} from '../../hocs/isoLangs';

const { TextArea } = Input;
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY
const googleTranslate = require('google-translate')(apiKey);

class Translation extends Component {
  state = {
    translation: {},
    detectedLanguage: '',
  }

  handleTextChange(e){
    const translating = translation => {
      this.setState({translation});
    }
    const detectLanguage = lang => {
      const detectedLanguage = isoLangs[lang]
      this.setState({detectedLanguage})
    }
    if(e.keyCode===13){
      if(apiKey){
        googleTranslate.translate(e.target.value, 'en', function(err, translation) {
          if(translation){
            translating(translation);
            detectLanguage(translation.detectedSourceLanguage)
          }
        });
      }
    }
  }

  render(){
    const {translation, detectedLanguage} = this.state
    return <>
      <div className="flex mb-4 flex-wrap mb-5">
        <div className="w-full lg:w-1/2 p-4">
          <div className="border-dotted border-4 border-gray-600 p-3">
            <h1 style={{fontSize: "20px"}}>Your language: 
              {detectedLanguage? ` ${detectedLanguage.name}`: ''}
            </h1>
            <TextArea className="inputTextArea" onKeyDown={(e) => this.handleTextChange(e)}/>
          </div>
        </div>
        <div className="w-full lg:w-1/2 p-4">
          <div className="border-dotted border-4 border-gray-600 p-3">
            <h1 style={{fontSize: "20px"}}>English</h1>
            <TextArea className="inputTextArea" readOnly 
              value={translation? translation.translatedText : ""}
            />
          </div>
        </div>
      </div>
    </>
  }
}

export default Translation;
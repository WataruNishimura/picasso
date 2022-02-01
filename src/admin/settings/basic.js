
import "./scss/admin.scss"
import api from "@wordpress/api"
import apiFetch from "@wordpress/api-fetch"

import { render, useState, useEffect } from "@wordpress/element"
import {
  ColorPicker, Button, TextControl
} from "@wordpress/components"


const GeneralPage = () => {

  const [textColor, setTextColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");

  useEffect(() => {
    api.loadPromise.then(() => {
      const model = new api.models.Settings();
      model.fetch().then(response => {
        setTextColor(response.picasso_text_color ? "#aaaaaa": "#000000");
        setBackgroundColor(response.picasso_background_color ? String(response.picasso_background_color) : "#ffffff");
      });
    });
  }, []);

  const onSubmit = () => {
    console.log(textColor)
    api.loadPromise.then(() => {
      const model = new api.models.Settings({
        'picasso_text_color': textColor,  // stateの値
        'picasso_background_color': backgroundColor,         // st // stateの値
      });
      const save = model.save();


      save.success((response, status) => {
        console.log(response);
        console.log(status);
      });
      save.error((response, status) => {
        console.log(response);
        console.log(status);
      });
    });
  }



  return (
    <div className="wrap">
      <h1>基本設定</h1>
      <div>
        <h2>文字色</h2>
        <ColorPicker label="文字色" color={textColor} onChangeComplete={(value) => setTextColor(value.hex)} />
      </div>
      <div>
        <h2>背景色</h2>
        <ColorPicker label="背景色" color={backgroundColor} onChangeComplete={(value) => setBackgroundColor(value.hex)} />
      </div>
      <Button isPrimary={true} onClick={onSubmit}>設定を保存</Button>
    </div>
  )
}

render(<GeneralPage />, document.getElementById("picasso-general-page"))
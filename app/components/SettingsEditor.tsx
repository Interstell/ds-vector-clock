import React, { useState } from 'react';
import classes from './SettingsEditor.scss';

type Props = {
  canvasWidth: number;
  canvasHeight: number;
  changeCanvasSize: (width: number, height: number) => void;
};

export default function SettingsEditor(props: Props) {
  const {
    canvasWidth: canvasWidthInitial,
    canvasHeight: canvasHeightInitial,
    changeCanvasSize
  } = props;

  const [canvasWidth, setCanvasWidth] = useState(canvasWidthInitial);
  const [canvasHeight, setCanvasHeight] = useState(canvasHeightInitial);

  return (
    <div className="box">
      <div className={classes['canvas-size-wrapper']}>
        <p>Size</p>
        <input
          className="input"
          type="number"
          min="100"
          max="1500"
          placeholder="Width"
          value={canvasWidth}
          onChange={e => setCanvasWidth(Number(e.target.value))}
        />
        x
        <input
          className="input"
          type="number"
          min="100"
          max="1500"
          placeholder="Height"
          value={canvasHeight}
          onChange={e => setCanvasHeight(Number(e.target.value))}
        />
        <button
          type="button"
          className="button is-link"
          onClick={() => changeCanvasSize(canvasWidth, canvasHeight)}
        >
          Apply
        </button>
      </div>
    </div>
  );
}

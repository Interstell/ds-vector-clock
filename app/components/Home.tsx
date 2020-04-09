import React from 'react';
import CanvasStage from '../containers/CanvasStage';
// import SettingsEditor from '../containers/SettingsEditor';

type Props = {
  resetState: () => void;
};

export default function Home(props: Props) {
  const { resetState } = props;
  return (
    <div className="App">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            {/* <h1 className="title has-text-centered">Vector Clock</h1> */}
            <div className="columns">
              {/* <div className="column is-one-third"> */}
              {/*  <SettingsEditor /> */}
              {/* </div> */}
              <div className="column canvas-block">
                <CanvasStage />
              </div>
            </div>
            <div className="has-text-centered">
              <button
                type="button"
                className="button is-large is-danger"
                onClick={() => resetState()}
              >
                Restart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

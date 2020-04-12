import React from 'react';
import classnames from 'classnames';
import CanvasStage from '../containers/CanvasStage';
// import SettingsEditor from '../containers/SettingsEditor';
import classes from './Home.scss';

type Props = {
  resetState: (type: string) => void;
  calculateVectorTimestamps: () => void;
};

export default function Home(props: Props) {
  const { resetState, calculateVectorTimestamps } = props;
  return (
    <div className="App">
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div
              className={classnames(
                classes['home-main-buttons'],
                'has-text-centered'
              )}
            >
              <button
                type="button"
                className="button is-large is-success"
                onClick={() => calculateVectorTimestamps()}
              >
                Calculate
              </button>
              <button
                type="button"
                className="button is-large is-info"
                onClick={() => resetState('sample')}
              >
                Sample 1
              </button>
              <button
                type="button"
                className="button is-large is-info"
                onClick={() => resetState('sample2')}
              >
                Sample 2
              </button>
              <button
                type="button"
                className="button is-large is-danger"
                onClick={() => resetState('default')}
              >
                Restart
              </button>
            </div>
            {/* <h1 className="title has-text-centered">Vector Clock</h1> */}
            <div className="box">
              <p>
                {'1. '}
                <b>Processes</b> can be added by clicking a
                <span style={{ color: 'green' }}>{' plus '}</span>
                sign below the lines.
              </p>
              <p>
                2.
                <b> Events</b> can be added by clicking on a process line.
              </p>
              <p>
                3. A <b>message </b>
                can be created by clicking on one of the events and choosing a
                receiving event among one of the
                <span style={{ color: '#FFC107' }}> yellow </span>
                events.
              </p>
              <p>
                4. You can set <b>calculate </b>
                vector timestamps by clicking on the Calculate button.
              </p>
              <p>
                5. You can select one of the <b>sample </b>
                configurations by clicking on Sample 1 / Sample 2 button.
              </p>
              <p>
                6. You can restart everyting by clicking <b>Restart </b>
                button.
              </p>
            </div>
            <div className="columns">
              {/* <div className="column is-one-third"> */}
              {/*  <SettingsEditor /> */}
              {/* </div> */}
              <div className="column canvas-block">
                <CanvasStage />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import { appStateType } from '../reducers/types';
import { changeCanvasSize } from '../actions/canvas';
import SettingsEditor from '../components/SettingsEditor';

function mapStateToProps(state: appStateType) {
  return {
    canvasWidth: state.canvas.canvasWidth,
    canvasHeight: state.canvas.canvasHeight
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      changeCanvasSize
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsEditor);

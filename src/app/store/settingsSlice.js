import { createSlice } from '@reduxjs/toolkit';
import _ from '../../@lodash';
import settingsConfig from '../configs/settingsConfig';
import themeLayoutConfigs from '../theme-layouts/themeLayoutConfigs';

function getInitialSettings() {
  const defaultLayoutStyle =
    settingsConfig.layout && settingsConfig.layout.style ? settingsConfig.layout.style : 'layoutMain';
  const layout = {
    style: defaultLayoutStyle,
    config: themeLayoutConfigs[defaultLayoutStyle].defaults,
  };
  return _.merge({}, { layout }, settingsConfig);
}

export function generateSettings(_defaultSettings, _newSettings) {
  const response = _.merge(
    {},
    _defaultSettings,
    { layout: { config: themeLayoutConfigs[_newSettings?.layout?.style]?.defaults } },
    _newSettings
  );

  return response;
}

const initialSettings = getInitialSettings();

const initialState = {
  initial: initialSettings,
  defaults: _.merge({}, initialSettings),
  current: _.merge({}, initialSettings),
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action) => {
      const current = generateSettings(state.defaults, action.payload);

      return {
        ...state,
        current,
      };
    },

    setInitialSettings: (state, action) => {
      return _.merge({}, initialState);
    },
    resetSettings: (state, action) => {
      return {
        ...state,
        defaults: _.merge({}, state.defaults),
        current: _.merge({}, state.defaults),
      };
    },
  },
});
export const selectFuseCurrentSettings = ({ settings }) => settings.current;
export const selectFuseDefaultSettings = ({ settings }) => settings.defaults;
export const selectFuseCurrentLayoutConfig = ({ settings }) => settings.current.layout.config;
export const { resetSettings, setInitialSettings, setSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

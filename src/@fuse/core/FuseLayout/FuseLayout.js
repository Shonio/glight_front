import { useDeepCompareEffect } from '../../../@fuse/hooks';
import _ from '../../../@lodash';
import AppContext from '../../../app/AppContext';
import { memo, useCallback, useContext, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchRoutes, useLocation } from 'react-router-dom';
import {
    generateSettings,
    selectFuseCurrentSettings,
    selectFuseDefaultSettings,
    setSettings
} from "../../../app/store/settingsSlice";

function FuseLayout(props) {

  const { layouts } = props;
  const dispatch = useDispatch();
  const defaultSettings = useSelector(selectFuseDefaultSettings);
  const settings = useSelector(selectFuseCurrentSettings);

  const appContext = useContext(AppContext);
  const { routes } = appContext;

  const location = useLocation();
  const { pathname } = location;

  const matchedRoutes = matchRoutes(routes, pathname);
  const matched = matchedRoutes ? matchedRoutes[0] : false;

  const newSettings = useRef(null);

  const shouldAwaitRender = useCallback(() => {
    let _newSettings;
    /**
     * On Path changed
     */
    // if (prevPathname !== pathname) {
    if (matched && matched.route.settings) {
      /**
       * if matched route has settings
       */

      const routeSettings = matched.route.settings;

      _newSettings = generateSettings(defaultSettings, routeSettings);
    } else if (!_.isEqual(newSettings.current, defaultSettings)) {
      /**
       * Reset to default settings on the new path
       */
      _newSettings = _.merge({}, defaultSettings);
    } else {
      _newSettings = newSettings.current;
    }

    if (!_.isEqual(newSettings.current, _newSettings)) {
      newSettings.current = _newSettings;
    }
  }, [defaultSettings, matched]);

  shouldAwaitRender();

  useDeepCompareEffect(() => {
    if (!_.isEqual(newSettings.current, settings)) {
      dispatch(setSettings(newSettings.current));
    }
  }, [dispatch, newSettings.current, settings]);

  // console.warn('::FuseLayout:: rendered');

  const Layout = useMemo(() => layouts[settings.layout.style], [layouts, settings.layout.style]);

  return _.isEqual(newSettings.current, settings) ? (
    <>
      <Layout {...props} />
    </>
  ) : null;
}

export default memo(FuseLayout);

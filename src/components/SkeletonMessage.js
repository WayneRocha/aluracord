import ContentLoader from "react-content-loader";
import appConfig from '../../config.json';

const SkeletonMessage = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={200}
    viewBox="0 0 400 100"
    backgroundColor={appConfig.theme.colors.neutrals["400"]}
    foregroundColor={appConfig.theme.colors.neutrals["300"]}
    {...props}
  >
    <rect x="48" y="8" rx="3" ry="3" width="88" height="12" /> 
    <rect x="48" y="26" rx="3" ry="3" width="52" height="12" /> 
    <rect x="0" y="56" rx="3" ry="3" width="410" height="12" /> 
    <rect x="-3" y="70" rx="3" ry="3" width="380" height="12" /> 
    <rect x="0" y="88" rx="3" ry="3" width="178" height="12" /> 
    <circle cx="20" cy="20" r="20" />
  </ContentLoader>
)

export default SkeletonMessage;

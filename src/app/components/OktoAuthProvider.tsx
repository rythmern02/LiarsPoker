import { GoogleOAuthProvider } from "@react-oauth/google";
import { BuildType, OktoProvider } from "okto-sdk-react";

const Provider = ({ children }: { children: any }) => {
  return (
    <GoogleOAuthProvider
      clientId={
        "201737013329-1vammkv48a66k8ijo8fq6p1e34veqe0g.apps.googleusercontent.com"
      }
    >
      <OktoProvider
        apiKey={"0601c20e-0298-4fbf-97cb-d62508d253c8"}
        buildType={BuildType.SANDBOX}
      >
        {children}
      </OktoProvider>
    </GoogleOAuthProvider>
  );
};

export default Provider;

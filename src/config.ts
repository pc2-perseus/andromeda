const CONFIG: ConfigData = {
    GATEWAY_URL: import.meta.env.DEV
        ? "http://localhost:8001/gateway"
        : // @ts-expect-error Access to dynamically set value
          window.env.VITE_API_URL,
};
interface ConfigData {
    GATEWAY_URL: string;
}
export default CONFIG;

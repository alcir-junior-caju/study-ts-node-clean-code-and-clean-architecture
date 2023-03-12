import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import AxiosAdapter from './infra/http/AxiosAdapter';
import CheckoutGatewayHttp from './gateways/CheckoutGatewayHttp';

const app = createApp(App);
// const httpClient = new FetchAdapter();
const httpClient = new AxiosAdapter();
const checkoutGateway = new CheckoutGatewayHttp(httpClient, "http://localhost:3003");
app.provide("checkoutGateway", checkoutGateway);
app.mount('#app')

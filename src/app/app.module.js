import { AppComponent } from './app.component';
import '../styles/styles.scss';

export const App = {
    init() {
        this.initComponents();
    },

    initComponents() {
        AppComponent.init();
    }
};
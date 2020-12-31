import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { login } from "../../../actions/auth";
import { AppRouter } from "../../../components/routers/AppRouter";
import { act } from "react-dom/test-utils";
import { firebase } from '../../../firebase/firebase-config';

jest.mock('../../../actions/auth', () => {
    return {
        login: jest.fn(),
    }
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    },
    note: {
        active: {
            id: 'ABC'
        },
        notes: [],
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();



describe('Pruebas <AppRouter />', () => {

    test('Debe de llamar el login si estoy autenticado', async () => {

        let user;

        await act(async () => {

            const userCred = await firebase.auth()
                .signInWithEmailAndPassword('adrian.lopez@pascualbravo.edu.co', '123456');

            user = userCred.user;

            const wrapper = mount(
                <Provider store={store}>
                    <MemoryRouter>
                        <AppRouter />
                    </MemoryRouter>
                </Provider>
            );

        });

        expect(login).toHaveBeenCalled();

    });

});

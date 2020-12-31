import { mount } from "enzyme";
import { Provider } from "react-redux";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from "react-router-dom";
import { startGoogleLogin, startLoginEmailPassword } from "../../../actions/auth";

jest.mock('../../../actions/auth', () => {
    return {
        startGoogleLogin: jest.fn(),
        startLoginEmailPassword: jest.fn(),
    }
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
    auth: {},
    ui: {
        loading: false,
        msgError: null,
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <LoginScreen />
        </MemoryRouter>
    </Provider>
);

describe('Prueba LoginScreen', () => {

    beforeEach(() => {
        jest.clearAllMocks();
        store = mockStore(initialState);
    });

    test('Debe de retornar el componente correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar la acción startGoogleLogin', () => {
        wrapper.find('.google-btn').prop('onClick')();
        expect(startGoogleLogin).toHaveBeenCalled();
    });



});

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { MemoryRouter } from 'react-router-dom';
import { RegisterScreen } from '../../../components/auth/RegisterScreen';
import { types } from '../../../types/types';

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
//store.dispatch = jest.fn(); // No va porque es sincrona la acción

const wrapper = mount(
    <Provider store={store}>
        <MemoryRouter>
            <RegisterScreen />
        </MemoryRouter>
    </Provider>
);

describe('Pruebas RegisterScreen', () => {

    beforeEach(() => {
        //jest.clearAllMocks();
        //store = mockStore(initialState);
    });

    test('Debe mostrarse correctamente', () => {

        expect(wrapper).toMatchSnapshot();

    });

    test('Debe hacer el dispatch de la acción validate error', () => {

        const emailField = wrapper.find('input[name="email"]');
        emailField.simulate('change', {
            target: {
                value: '',
                name: 'email',
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.uiSetError);
    });

    test('Debe de mostrar la caja con el error', () => {
        const initialState = {
            auth: {},
            ui: {
                loading: false,
                msgError: 'Name es requerido',
            }
        };

        const store = mockStore(initialState);

        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter>
                    <RegisterScreen />
                </MemoryRouter>
            </Provider>
        );

        expect(wrapper.find('.auth__alert-error').exists()).toBe(true);
    });



});

import { fileUpload } from '../../helpers/fileUpload';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

// Simular funcion de carga archivo
jest.mock('../../helpers/fileUpload', () => ({
    fileUpload: jest.fn(() => {
        return 'https://photo.jpg';
    })
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);

describe('Prueba auth-action', () => {

    beforeEach(() => {
        store = mockStore(initialState);
    });

    test('Debe realizar el logout', async () => {

        await store.dispatch(startLogout());
        const actions = store.getActions();

        //console.log(actions);

        expect(actions[0]).toEqual({
            type: types.logout,
        });

        expect(actions[1]).toEqual({
            type: types.noteLogoutCleaning,
        });
    });

    test('Debe de iniciar startLoginEmailPassword', async () => {
        await store.dispatch(
            startLoginEmailPassword('adrian.lopez@pascualbravo.edu.co', '123456')
        );

        const actions = store.getActions();

        //console.log(actions);

        expect(actions[2]).toEqual({
            type: types.login,
            payload: {
                uid: expect.any(String),
                displayName: expect.any(String),
            }
        });

    });
});

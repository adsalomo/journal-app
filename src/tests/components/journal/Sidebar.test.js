import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from "../../../actions/auth";
import { startNewNote } from "../../../actions/note";
import { Sidebar } from "../../../components/journal/Sidebar";

jest.mock('../../../actions/auth', () => {
    return {
        startLogout: jest.fn(),
    }
});

jest.mock('../../../actions/note', () => {
    return {
        startNewNote: jest.fn(),
    }
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const initialState = {
    auth: {
        uid: 'ABC',
        name: 'Elena'
    },
    note: {
        notes: []
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas <Sidebar />', () => {

    const wrapper = mount(
        <Provider store={store}>
            <Sidebar />
        </Provider>
    );

    test('Debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de llamar la accion startLogout', () => {
        wrapper.find('button').prop('onClick')();
        expect(startLogout).toHaveBeenCalled();
    });

    test('Debe de llamar la accion startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();
        expect(startNewNote).toHaveBeenCalled();
    });


});

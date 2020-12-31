import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { activeNote } from "../../../actions/note";
import { NoteScreen } from "../../../components/notes/NoteScreen";

jest.mock('../../../actions/note', () => {
    return {
        activeNote: jest.fn(),
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
        active: {
            id: 123,
            title: 'Hola mundo',
            body: 'Soy el cuerpo',
            date: 0,
        }
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Pruebas NoteScreen', () => {

    const wrapper = mount(
        <Provider store={store}>
            <NoteScreen />
        </Provider>
    );

    test('Debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Debe de disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Nuevo titulo'
            }
        });

        expect(activeNote).toHaveBeenCalled();

        // Cuando el componente se crea, se ejecuta la funcion,
        // Luego cuando el se hace la simulacion, se ejecuta de nuevo la funcion
        // por eso debe de evaluarse con
        expect(activeNote).toHaveBeenLastCalledWith(
            123,
            {
                id: 123,
                title: 'Nuevo titulo',
                body: 'Soy el cuerpo',
                date: 0,
            }
        );

    });


});


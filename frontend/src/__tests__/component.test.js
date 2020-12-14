import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import { createStore } from "redux";
import { Provider } from "react-redux";
import App from '../App';
import Home from '../components/Home';
import ContentLayout from '../components/ContentLayout';
import FromsList from '../components/FormsList';
import SingleForm from '../components/SingleForm';
import reducer from "../redux/form/formReducer";
import userEvent from '@testing-library/user-event'

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

afterEach(cleanup);

const renderWithRedux = (component) =>  render(<Provider store={createStore(reducer)}> {component} </Provider>);

it('renders home with redux', () => {
  const { asFragment } = renderWithRedux(<Home />);
  expect(asFragment()).toMatchSnapshot();

});

it('snapshot of content layout', () => {
  const { asFragment } = renderWithRedux(<ContentLayout />);
  expect(asFragment()).toMatchSnapshot();

});

it('snapshot of single form', async  () => {
  const { asFragment  } = await render(<SingleForm match={{params:"xx"}} />);
  expect(asFragment()).toMatchSnapshot();
});


it('renders Forms list', () => {
  const { getByText, asFragment } = renderWithRedux(<FromsList />);
  getByText("No Data");
  expect(asFragment()).toMatchSnapshot()
});


it('modal opens correctly', () => {
  const { getByText, asFragment  } = render(<App />)
  fireEvent.click(getByText("Add Form"));
  expect(asFragment()).toMatchSnapshot()
  getByText("Create a new Form");
})

it('renders text area on selecting checkbox', () => {
  const { getByText  } = render(<App />)
  fireEvent.click(getByText("Add Form"));
  getByText("Create a new Form");
  userEvent.click(getByText("Add Question"));
  getByText("Question 1");
  getByText("Input Format");
  userEvent.click(screen.getByText('Select Input'));
  userEvent.click(screen.getByText('Checkbox'));
  getByText('Options');
})

it('renders 2 input boxes when selecting radio', () => {
  const { getByText  } = render(<App />)
  fireEvent.click(getByText("Add Form"));
  getByText("Create a new Form");
  userEvent.click(getByText("Add Question"));
  getByText("Question 1");
  getByText("Input Format");
  userEvent.click(screen.getByText('Select Input'));
  userEvent.click(screen.getByText('Radio'));
  screen.getByText('Option 1');
  screen.getByText('Option 2');
})
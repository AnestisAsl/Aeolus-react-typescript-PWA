import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
  screen,
  act,
} from "@testing-library/react";
import SignIn from "../components/signIn";

test("SIGN IN PAGE DOM TESTING", async () => {
  const { getByText, getByTestId } = render(<SignIn />);
  const sunIcon = getByTestId("sun-icon");
  const moonIcon = getByTestId("moon-icon");
  const visibilityButton = getByTestId("visibility-button");

  getByText("LOGIN");
  getByText("Username");
  getByText("Password");
  getByText("SUBMIT");
  getByText("BACK");
  expect(sunIcon).toBeTruthy();
  expect(moonIcon).toBeTruthy();
  expect(visibilityButton).toBeTruthy();
});

test("SIGN IN VISIBLE BUTTON TESTING", async () => {
  const { getByLabelText, getByTestId } = render(<SignIn />);
  const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;

  const visibilityButtonClickableText = getByTestId(
    "visibility-button-click-password"
  );
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  expect(passwordInput.type).toBe("password");
  fireEvent.click(visibilityButtonClickableText);
  const visibilityButtonClickablePassword = getByTestId(
    "visibility-button-click-text"
  );
  //INPUT TYPE CHANGED TO TEXT
  expect(passwordInput.type).toBe("text");
  fireEvent.click(visibilityButtonClickablePassword);
  //INPUT TYPE CHANGED BACK TO PASSWORD
  expect(passwordInput.type).toBe("password");
});

test("SIGN UP INPUT TESTING", async () => {
  const { getByLabelText } = render(<SignIn />);
  const usernameInput = getByLabelText("usernameInput") as HTMLInputElement;
  const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;

  fireEvent.change(usernameInput, { target: { value: "test" } });
  expect(usernameInput.value).toBe("test");
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  expect(passwordInput.value).toBe("123456");
});

import * as React from "react";
import {
  render,
  fireEvent,
  cleanup,
  waitForElementToBeRemoved,
  screen,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUp from "../components/signUp";
import axios from "axios";

afterEach(cleanup);
test("SIGN UP PAGE  DOM TESTING", async () => {
  const { getByText, getByTestId } = render(<SignUp />);
  const cloudSunIcon = getByTestId("cloudSun-icon");
  const cloudMonnIcon = getByTestId("cloudMoon-icon");
  const visibilityButton = getByTestId("visibility-button");
  //SIGN UP PAGE INDICATORS
  getByText("SIGN UP");
  getByText("Username");
  getByText("Password");
  getByText("Confirm Password");
  getByText("SUBMIT");
  getByText("BACK");
  expect(cloudSunIcon).toBeTruthy();
  expect(cloudMonnIcon).toBeTruthy();
  expect(visibilityButton).toBeTruthy();
});

test("SIGN UP INPUT TESTING", async () => {
  const { getByLabelText } = render(<SignUp />);
  const usernameInput = getByLabelText("usernameInput") as HTMLInputElement;
  const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;
  const confirmPasswordInput = getByLabelText(
    "confirmPasswordInput"
  ) as HTMLInputElement;

  fireEvent.change(usernameInput, { target: { value: "test" } });
  expect(usernameInput.value).toBe("test");
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  expect(passwordInput.value).toBe("123456");
  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
  expect(confirmPasswordInput.value).toBe("123456");
});

test("SIGN UP VISIBLE BUTTON TESTING", async () => {
  const { getByLabelText, getByTestId } = render(<SignUp />);
  const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;
  const confirmPasswordInput = getByLabelText(
    "confirmPasswordInput"
  ) as HTMLInputElement;
  const visibilityButtonClickableText = getByTestId(
    "visibility-button-click-password"
  );
  fireEvent.change(passwordInput, { target: { value: "123456" } });
  fireEvent.change(confirmPasswordInput, { target: { value: "123456" } });
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

describe("INPUT VALIDATION", () => {
  it("PASSWORD!=CONFIRM PASSWORD", async () => {
    const { getByLabelText, getByTestId, findByText } = render(<SignUp />);

    const usernameInput = getByLabelText("usernameInput") as HTMLInputElement;
    const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;
    const confirmPasswordInput = getByLabelText(
      "confirmPasswordInput"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "test" } });
    });
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "123456" } });
    });
    await act(async () => {
      fireEvent.change(confirmPasswordInput, { target: { value: "1234567" } });
    });
    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    await findByText("Password fields don't match.");
    await findByText("CLEAR");
  });
  it("PASSWORD LENGTH <=6", async () => {
    const { getByLabelText, getByTestId, findByText } = render(<SignUp />);

    const usernameInput = getByLabelText("usernameInput") as HTMLInputElement;
    const passwordInput = getByLabelText("passwordInput") as HTMLInputElement;
    const confirmPasswordInput = getByLabelText(
      "confirmPasswordInput"
    ) as HTMLInputElement;

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "test" } });
    });
    await act(async () => {
      fireEvent.change(passwordInput, { target: { value: "12345" } });
    });
    await act(async () => {
      fireEvent.change(confirmPasswordInput, { target: { value: "12345" } });
    });
    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });
    await screen.findByText("Password must be at least 6 characters long.");
    await screen.findByText("CLEAR");
  });
});

import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import App from "../App";

afterEach(cleanup);

test("ROUTE TESTING", async () => {
  const { getByText } = render(<App />);
  //DISPLAY HOME PAGE
  getByText("AEOLUS");
  //CLICK SIGN IN BUTTON
  fireEvent.click(getByText("Sign In"));
  //DISPLAY THE LOGIN PAGE
  getByText("LOGIN");
  //CLICK AT THE BACK BUTTON
  fireEvent.click(getByText("BACK"));
  //DISPLAY HOME PAGE AGAIN
  //CLICK SIGN UP BUTTON
  fireEvent.click(getByText("Sign Up"));
  //DISPLAY SIGN UP PAGE
  getByText("SIGN UP");
  //CLICK AT THE BACK BUTTON
  fireEvent.click(getByText("BACK"));
  //DISPLAY HOME PAGE AGAIN
  getByText("AEOLUS");
});

test("HOME PAGE DOM TESTING", async () => {
  const { getByText, getByTestId } = render(<App />);
  getByTestId("toggle-button");
  getByTestId("wheel");
  getByText("SPIN");
  //LINKS
  expect(getByTestId("link-aeolus").closest("a")?.href).toBe(
    "https://en.wikipedia.org/wiki/Aeolus"
  );
});

test("CHANGE THEME TESTING", async () => {
  const { getByTestId, getByText, container } = render(<App />);
  const toggleButton = getByTestId("toggle-button");
  const body = document.body;
  //BODY THEME INITIALLY "light"
  expect(body.classList[0]).toBe("light");
  //CLICK THE CHANGE THEME BUTTON
  fireEvent.click(toggleButton);
  //BODY THEME CHANGES TO "dark"
  expect(body.classList[0]).toBe("dark");
});

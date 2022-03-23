import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import LoginHome from "../components/loginHome";

afterEach(cleanup);

test("LOGINHOME DOM TESTING", async () => {
  //   const { getByText, getByTestId } = render(<LoginHome />);
  //   const userData = {
  //     user: "test",
  //   };
  //   getByText("AEOLUS");
  //   //LINKS
  //   expect(getByTestId("link-aeolus").closest("a")?.href).toBe(
  //     "https://en.wikipedia.org/wiki/Aeolus"
  //   );
});

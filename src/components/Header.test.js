import { render, screen } from "@testing-library/react";
import Header from "./Header";
import "@testing-library/jest-dom"; // for the "toBeInTheDocument" matcher

describe("Header component", () => {
  test("renders logo image", () => {
    render(<Header />);
    const logoImage = screen.getByAltText("Dreamcast");
    expect(logoImage).toBeInTheDocument();
  });

  test("renders the ExitToAppIcon", () => {
    render(<Header />);
    const logoutIcon = screen.getByTestId("ExitToAppIcon");
    expect(logoutIcon).toBeInTheDocument();
  });
});

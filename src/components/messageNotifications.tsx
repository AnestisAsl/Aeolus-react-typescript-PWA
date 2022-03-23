import { FC } from "react";
import * as React from "react";

interface ErrorProps {
  message: string;
  eraseError: any;
}

const MessageNotifications: FC<ErrorProps> = ({ message, eraseError }) => {
  return (
    <div className="errors">
      <p data-testid="message">{message}</p>
      <button onClick={eraseError} className="submitButton">
        CLEAR
      </button>
    </div>
  );
};
export default MessageNotifications;

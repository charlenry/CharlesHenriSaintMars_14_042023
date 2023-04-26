# react-modal-package

This react component renders a modal with a message centered inside it with a close button.

## Install this package:

```shell
npm install @charlenry/react-modal-package
```

##  Import the Modal component

```jsx
import Modal from "@charlenry/react-modal-package";
```

## Usage

This react modal takes in six props :

- `displayState` - The open or closed state of the modal. It can be manage with a local state like in the example below. The two values are <b>block</b> and <b>none</b>. The modal is Hidden by default.
- `handleClose` - The callback that handles the close button of the modal.
- `message` - The message to display in the modal
- `bgColor` - The background color of the modal (optional)
- `textColor` - The text color of the message (optional)
- `btnColor` - The basic color of the close button (optional)

The modal needs sass to run. See below how to install it.

```shell
npm install sass
```
or
```shell
yarn add sass
```

### Example

```jsx
import { useState } from "react";
import Modal from "@charlenry/react-modal-package";

function App() {
  const [modalDisplayState, setModalDisplayState] = useState("none");

  const handleOpenModal = () => {
    setModalDisplayState("block");
  };

  const handleCloseModal = () => {
    setModalDisplayState("none");
  };

  return (
    <div>
      <button onClick={handleOpenModal}>Open Modal</button>
      <Modal
        displayState={modalDisplayState}
        handleClose={handleCloseModal}
        message="You have successfully used this modal!"
        bgColor=""
        textColor=""
        btnColor=""
      />
    </div>
  );
}

export default App;
```

import React from 'react';


class NumberSender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  render() {
    return (
      <div>
        <button onClick={() => this.sendNumber(1)}>Enviar 1</button>
        <button onClick={() => this.sendNumber(2)}>Enviar 2</button>
        <button onClick={() => this.sendNumber(3)}>Enviar 3</button>
        <button onClick={() => this.sendNumber(4)}>Enviar 4</button>
      </div>
    );
  }

  sendNumber(number) {
    fetch('/api/endpoint', {
      method: 'POST',
      body: JSON.stringify({number}),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(response => {
      // hacer algo con la respuesta
    }).catch(error => {
      console.error(error);
    });
  }
}

export default NumberSender;
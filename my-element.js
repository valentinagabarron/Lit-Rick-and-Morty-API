import { LitElement, html, css } from 'lit';

export class MyElement extends LitElement {

  fetchCharacters() {
    fetch('https://rickandmortyapi.com/api/character')
      .then(response =>  response.json())
      .then(data => {
        console.log('Personajes:', data);
        this.characters = data.results;
      })
      .catch(error => {
        console.error('Error al obtener los personajes:', error);
      });
  }

  static get styles() {
    return css`
      :host {
        background-color: #f5f5f5;
        max-width: 800px;
      }

      .container {
        display: grid;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 1rem;
        width: 100%;
      }

      .character {
        border: 1px solid white;
        background-color: white;
        width: 100%;
        text-align: center;
      }

      .character img {
        max-width: 100%;
        border-radius: 5px;
        max-width: 128.1px;
        max-height: 128.1px;
        width: auto;
        height: auto;
      }

      main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        width: 100%;
      }
    `;
  }

  static get properties() {
    return {
      characters: { type: Array },
    };
  }

  constructor() {
    super();
    this.characters = [];
    this.fetchCharacters();
  }

  renderCharacter(character) {
    return html`
      <div class="character">
        <h2>${character.name}</h2>
        <img src="${character.image}" alt="${character.name}">
        <p>${character.species + ' ' + character.status}</p>
      </div>
    `;
  }

  render() {
    return html`
    <main>
      <div class="container">
        ${this.characters.map(character => this.renderCharacter(character))}
      </div>
    </main>
    `;
  }
}

window.customElements.define('my-element', MyElement);
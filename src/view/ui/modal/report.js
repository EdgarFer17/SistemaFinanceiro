import BaseComponent from "../components/baseComponent.js";
import CategoryController from "../../../controller/categoryController.js";
import TransationModel from "../../../model/transationModel.js";

export default class ModalReport extends BaseComponent {
    constructor(config = {}, style_config = {}) {
        super(config, style_config);
    }

    spawn() {
        const categoryList = CategoryController.getCategories();
        
        const categoryOptions = categoryList.map(cat => 
            `<option value="${cat.categoryName}">${cat.categoryName}</option>`
        ).join('');
        
        this.main = document.createElement('div');
        
        this.main.innerHTML = `
            <div style="background-color: white; border-radius: 20px; border: 1px solid #6ca09d; padding: 40px 60px; width: 100%; max-width: 750px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); font-family: sans-serif; position: relative;">
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 35px;">
                    <h2 style="color: #6ca09d; font-weight: bold; font-size: 2.2rem; margin: 0;">
                        Fazer Transação
                    </h2>
                    <button type="button" id="close-modal-btn" 
                            style="background: none; border: none; font-size: 2.5rem; color: #a4c4c1; cursor: pointer; padding: 0; line-height: 0.8; transition: color 0.2s;">
                        &times;
                    </button>
                </div>

                <form id="transaction-form" style="display: flex; flex-direction: column; gap: 25px;">
                    
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="color: #6ca09d; font-size: 1.2rem;">Valor</label>
                        <input type="number" step="any" id="valor-input" placeholder="Digite o valor da transação" required
                               style="padding: 15px; border: 1px solid #a4c4c1; border-radius: 8px; font-size: 1rem; color: #777; outline: none; width: 100%; box-sizing: border-box;">
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="color: #6ca09d; font-size: 1.2rem;">Tipo</label>
                        <select id="type-select" required style="padding: 15px; border: 1px solid #a4c4c1; border-radius: 8px; font-size: 1rem; color: #777; outline: none; background-color: white; cursor: pointer; width: 100%; box-sizing: border-box;">
                            <option value="" disabled selected></option>
                            <option value="RECEITA">Receita</option>
                            <option value="DESPESA">Despesa</option>
                        </select>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        <label style="color: #6ca09d; font-size: 1.2rem;">Categoria</label>
                        <select id="category-select" required
                                style="padding: 15px; border: 1px solid #a4c4c1; border-radius: 8px; font-size: 1rem; color: #777; outline: none; background-color: white; cursor: pointer; width: 100%; box-sizing: border-box;">
                            <option value="" disabled selected></option>
                            ${categoryOptions}
                        </select>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 8px;">
                    <label style="color: #6ca09d; font-size: 1.2rem;">Descrição</label>
                        <input type="text" id="desc-input" placeholder="Descrição (opcional)" style="padding: 15px; border: 1px solid #a4c4c1; border-radius: 8px; font-size: 1rem;"> 
                    </div>

                    <button type="submit" 
                            style="background-color: #6ca09d; color: white; border: none; padding: 18px; border-radius: 8px; font-size: 1.2rem; margin-top: 20px; cursor: pointer; font-weight: 500; width: 100%; box-sizing: border-box;">
                        Adicionar Transação
                    </button>

                </form>
            </div>`;
    }

    style(){}

    setup(config) {
        
        const form = this.main.querySelector('#transaction-form');
        const closeBtn = this.main.querySelector('#close-modal-btn');

        // Lógica do botão Fechar
        closeBtn.addEventListener('click', () => {
            const event = new CustomEvent('fecharModal', { bubbles: true });
            this.main.dispatchEvent(event);

        });

        // Hover effect para o botão fechar ficar mais escuro ao passar o mouse
        closeBtn.addEventListener('mouseover', () => closeBtn.style.color = '#6ca09d');
        closeBtn.addEventListener('mouseout', () => closeBtn.style.color = '#a4c4c1');

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            try {
                let value = parseFloat(this.main.querySelector('#valor-input').value);
                const type = this.main.querySelector('#type-select').value;
                const categoryName = this.main.querySelector('#category-select').value;
                const desc = this.main.querySelector('#desc-input').value;
                
                const dataAtual = new Date();

                if (type === "DESPESA" && value > 0) value = -value;
                else if (type === "RECEITA" && value < 0) value = Math.abs(value);

                const categoryObj = CategoryController.getCategories().find(c => c.categoryName === categoryName);

                const newTransaction = new TransationModel(dataAtual, categoryObj, type, value, desc);
                console.log("Transação salva:", newTransaction);

                const transactionEvent = new CustomEvent('newTransaction', { bubbles: true, detail: newTransaction });
                this.main.dispatchEvent(transactionEvent);

                form.reset();
                alert("Transação Adicionada com Sucesso!");
                
                // Fecha o modal após adicionar com sucesso
                closeBtn.click();

            } catch (error) {
                alert("Erro: " + error.message);
            }
        });
    }

    build() {}
}